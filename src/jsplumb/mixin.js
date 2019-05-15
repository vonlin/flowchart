import { __, __util, nodeBaseProperties } from "@/jsplumb";
import NP from '@/jsplumb/nodePool'
import {NodeDragProperties} from './NodeDragProperties'
import {importDefaults} from './NodeBaseProperties'
import NodeConnections from './NodeConnections'
import NodeEndpoints from './NodeEndpoints'
import Util from './Util'
const uuidv4 = require('uuid/v4')
export default {
    components:{
        'type_1' : () => import('./NodePropTplType1'),
        'standard' : () => import('./NodePropTplStandard')
    },
    data () {
        return {
            _ins_ : null, // jsplumb 实例
            _np_ : null, // 节点池实例
            componentType:'', // 当前打开的节点属性框组件类型
            showNodePropBox:false,// 默认不显示节点属性框，右键查看时才显示
            nodePropData : null, // 当前节点属性数据,
            isGrid: true, // 是否开启网格
            scaleStep: 0.1, // 缩放步数
            scale:1 // 初始缩放倍数
        }
    },
    watch:{
        isGrid (val,oldVal) {
            // TODO 暂时没找到办法实时切换网格功能，只能初始化流程图组件决定是否开启网格功能
            if(val){
                this._ins_.draggable($('.jce-node'),__.extend({},this.jsplumbDragOption(),{force:true,grid:[10,10]}))
            }else{
                this._ins_.draggable($('.jce-node'),__.extend({},this.jsplumbDragOption(),{force:true,grid:[0,0]}))
            }
        }
    },
    created () {
        // 创建节点池实例
        this._np_ = new NP()
        // 创建jsplumb实例
        this._ins_ = __.getInstance(importDefaults)
        // 全局注册连接线类型
        this._ins_.registerConnectionTypes(NodeConnections);
        // 全局注册端点类型
        this._ins_.registerEndpointTypes(NodeEndpoints)
    },
    methods: {
        ...Util,
        handleToolboxClick (tool) {
            // 处理工具栏事件
            this.toolboxHandler()[tool.type]()
        },
        bindCommEvent() {
            this._ins_.unbind();
            this._ins_.bind('connection',this.handleConnection) // 连接事件
            this._ins_.bind('connectionDetached',this.handleConnDetached) // 删除连接
            this._ins_.bind('beforeDrop',this.handleBeforeDrop)  // 连接之前事件
            this._ins_.bind('click',this.handleClick) // 点击事件
        },
        handleClick (connection, originalEvent) {
            this.handleConnClick(connection,originalEvent)
        },
        handleConnection (info) {
            // 连接
            console.log('连接： ',info)
            this._np_.addConn(info)
        },
        handleConnDetached (info) {
            // 删除连接
            this._np_.delConn(info)
        },
        handleBeforeDrop (info) {
            // 连接之前
            return this._np_.beforeDrop(info)
        },
        handleRightClick (component,originEvent){
            // 绑定jsplumb实例右键事件
            console.log(component,originEvent)
        },
        jsplumbDragOption () {
            let vm = this
            let grid = vm.showGrid ? [10, 10] : [0,0]
            return {
                drag: function(){
                },
                stop: function(event,ui){
                    // console.log(event,ui)
                    // console.log($(event.el).attr('id'))
                    let _node = vm._np_.nodeMap.get($(event.el).attr('id'))
                    _node.position = {
                        x: event.pos[0],
                        y: event.pos[1]
                    }
                    console.log(JSON.stringify([...vm.getAllNodes()]))
                },
                grid,
                containment: 'parent'
            }
        },
        /**
         * 添加拖拽节点
         * {Object} dragEle: 拖拽元素类型
         * {dom} container: 流程图容器
         */
        addNode (dragEle,container,position) {
            let _node_ = NodeDragProperties[dragEle.type || 'standard']
            // 1、生成当前元素的唯一标识
            let uuid = uuidv4()
            _node_ =  $.extend(true,{},_node_,{uuid,extendInfo:{..._node_.extendInfo,...dragEle}})
            // 2、创建node dom
            $(container).append(this.createFlowchartHtml(_node_))
            //设置位置
            _node_.position = {
                x: position.x,
                y: position.y
            }
            this.setPosition(uuid,position)
            //3、添加端点
            for(let p in _node_.jsplumbOption){
                _node_.jsplumbOption[p].forEach(item => {
                    // 添加端点
                    let _uuid = 'anchor-'+uuidv4()
                    this._ins_.addEndpoint(
                        uuid,
                        {uuid:_uuid,...item,connectionType:dragEle.type },
                        // item
                    )
                    //将uuid属性赋值给item
                    item['uuid'] = _uuid
                })
            }
            this._ins_.draggable(uuid,this.jsplumbDragOption(_node_))
            // 4、绑定事件
            this.bindCommEvent()
            //节点右键事件
            this.handleNodeRightClick(_node_)
            // 5、加入节点管理池
            this._np_.nodeMap.set(uuid,_node_)
        },
        /**
         * 根据指定的数据绘制流程图
         * @param {String} flowchartData  // 初始化节点数据
         * @param {String} container  // 容器
         */
        paintByData (flowchartData,container) {
            console.log(JSON.parse(flowchartData))
            let nodes = JSON.parse(flowchartData)
            nodes.forEach((item,index) => {
                // 创建dom
                $(container).append(this.createFlowchartHtml(item))
                // 设置位置
                this.setPosition(item.uuid,item.position)
                // 添加端点
                for(let p in item.jsplumbOption){
                    item.jsplumbOption[p].forEach(it => {
                        // 添加端点
                        this._ins_.addEndpoint(
                            item.uuid,
                            {...it,connectionType:item.type },
                        )
                    })
                }
                // 设置可以拖动
                this._ins_.draggable(item.uuid,this.jsplumbDragOption(item))
                //节点右键事件
                this.handleNodeRightClick(item)
                // 加入节点管理池
                this._np_.nodeMap.set(item.uuid,item)
            })
            // 将端点进行连接
            nodes.forEach((item,index) => {
                let uuidConns = item.endpointConnections
                if(uuidConns.length > 0){
                    uuidConns.forEach(uuid => {
                        let conn = this.connectByUuid(uuid.sourceEndpointUuid,uuid.targetEndpointUuid)
                        conn.setType(item.type)
                    })
                }
            })
            // 绑定事件
            this.bindCommEvent()
        },
        /**
         * 通过uuid进行连接
         * @param {String} sourceUuid 
         * @param {String} targetUuid 
         */
        connectByUuid (sourceUuid,targetUuid) {
            return this._ins_.connect({
                uuids:[sourceUuid,targetUuid]
            })
        }
    }
}