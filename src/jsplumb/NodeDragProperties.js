/**
 * 左侧拖拽节点的属性
 * 包括：
 * 节点唯一标识 uuid
 * 节点的类型，type
 * 节点放置流程图中的html结构，flowchartHtml
 * 节点对应的属性配置html结构，configHtmls
 * 节点对应的jsplumb节点属性，jsplumbOption
 * 节点对应的扩展信息 extendInfo
 * 节点之间的连接线关系 connections
 * 节点端点之间的连接关系 endpointConnections
 * 节点位置信息 position
 * 右键菜单项 rightMenus 
 */
import { 
    nodeBaseProperties,
    outerNodeBaseProperties ,
    nodeBasePropertiesForType_1
} from './NodeBaseProperties'
let NodeDragProperties = {
    'standard': {
        uuid: '',
        type: 'standard',
        flowchartHtml: '',
        configHtmls: [],
        rightMenus:[
            {name:'查看属性',action:'view'},
            {name:'删除',action:'delete'}
        ],
        jsplumbOption: {
            sources: [
                { isSource:false,isTarget:false,...nodeBaseProperties, anchor: [1, 0.5, 1, 0]},
                { isSource:true,isTarget:false,...nodeBaseProperties,...outerNodeBaseProperties, anchor: [1, 0.5, 1, 0]}
            ],
            targets: [
                {  isTarget:true,isSource:false,...nodeBaseProperties, anchor: [0, 0.33, -1, 0] },
                {  isTarget:true,isSource:false,...nodeBaseProperties, anchor: [0, 0.66, -1, 0] }
            ]
        },
        extendInfo: {
            nodePropData: {
                title:'标准节点属性'
            }
        },
        connections: [],
        endpointConnections:[],
        position:{}
    },
    'type_1': {
        uuid: '',
        type: 'type_1',
        flowchartHtml: '',
        configHtmls: [],
        rightMenus:[
            {name:'查看属性',action:'view'},
            {name:'删除',action:'delete'}
        ],
        jsplumbOption: {
            sources: [
                { isSource:true,isTarget:false,...nodeBasePropertiesForType_1, anchor: [1, 0.5, 1, 0]},
                { isSource:true,isTarget:false,...nodeBasePropertiesForType_1,...outerNodeBaseProperties, anchor: [1, 0.5, 1, 0]}
            ],
            targets: [
                {  isTarget:true,isSource:false,...nodeBasePropertiesForType_1, anchor: [0, 0.33, -1, 0] },
                {  isTarget:true,isSource:false,...nodeBasePropertiesForType_1, anchor: [0, 0.66, -1, 0] }
            ]
        },
        extendInfo: {
            nodePropData: {
                title:'节点类型一属性'
            }
        },
        connections: [],
        endpointConnections:[],
        position:{}
    }
}
export { NodeDragProperties }