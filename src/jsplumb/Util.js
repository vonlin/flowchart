/**
 * 定义 jsplumb 工具方法
 */
import UtilRelaHtmlTemplate from './UtilRelaHtmlTemplate'
export default {
    /**
     * 创建拖拽元素在流程图中的dom结构
     * @param {Object} dragEle  左侧拖拽元素
     */
    createFlowchartHtml(dragEle) {
        return UtilRelaHtmlTemplate.FlowchartNode(dragEle)
    },
    /**
     * 创建拖拽元素在属性栏中的dom结构
     * @param {左侧拖拽元素} dragEle 
     */
    createConfigHtmls(dragEle) {

    },
    // 工具栏事件
    toolboxHandler () {
        let vm = this
        return {
            selectBox () {
                // 框选
            },
            grid () {
                // 网格
                vm.isGrid = !vm.isGrid
            },
            zoomIn () {
                // 放大
                vm.scale += vm.scaleStep
                vm.cssStyle2.transform = 'scale('+ vm.scale +')'
            },
            zoomOut () {
                // 缩小
                vm.scale -= vm.scaleStep
                if(vm.scale  <= 0.1){
                    vm.scale = 0.1
                }
                vm.cssStyle2.transform = 'scale('+ vm.scale  +')'
            },
            zoomSelect () {
                // 缩放倍数下拉框
            },
            fullScreen () {
                // 全屏
                // let $container = vm.$refs.jceContainer
                // $('body').append($container)
                if(vm.cssStyle1.position == 'absolute'){
                    vm.cssStyle1.position = 'fixed'
                    // $container.style.position = 'fixed'
                }else{
                    vm.cssStyle1.position = 'absolute'
                    // $container.style.position = 'absolute'
                }
            }
        } 
    },
    /**
     * 设置拖拽元素的位置
     * @param {*} uuid 
     * @param {*} pos 
     */
    setPosition(uuid, pos) {
        $('#' + uuid).css({ left: pos.x + 'px', top: pos.y + 'px' })
    },
    /**
     * 获取流程图中所有节点
     */
    getAllNodes() {
        return this._np_.nodeMap.values()
    },
    /**
     * 删除节点，
     * 同时删除节点池中  nodeMap 中相对应的节点
     */
    delNode(node) {
        // 移除元素
        this._ins_.remove(node.uuid)
        // 删除连线（输入此节点和此节点输出的连线）
        // jsPlumb.deleteConnectionsForElement(node.uuid)
        // 删除端点 (此节点的所有端点)
        // 从 nodeMap 中删除节点
        this._np_.nodeMap.delete(node.uuid)
        console.log(this._np_.nodeMap)
    },
    /**
     * 删除单条连接线
     * @param {*} conn 
     */
    delConn(info) {
        this._ins_.deleteConnection(info.connection)
    },
    /**
     * 右键查看或者编辑节点属性
     * @param {*} node 
     */
    editOrViewNodeProp(node) {
        this.showNodePropBox = true
        this.componentType = node.type
        this.nodePropData = node.extendInfo.nodePropData
    },
    /**
     * 绑定节点右键事件
     */
    handleNodeRightClick(node) {
        let vm = this
        if (!node.rightMenus || node.rightMenus.length == 0) return
        $('#' + node.uuid).contextPopup({
            items: node.rightMenus.map(item => {
                return {
                    label: item.name,
                    action: {
                        view: function () {
                            // alert('查看属性')
                            vm.editOrViewNodeProp(node)
                        },
                        delete: function () {
                            // alert('删除')
                            vm.delNode(node)
                        }
                    }[item.action] || function () {
                        alert('空空如也')
                    }
                }
            })
        })
    },
    /**
     * 绑定点击连接线删除按钮事件
     */
    bindDelConnBtn(conn, e) {
        let vm = this
        let namespace = "." + conn.id
        let handler = function () {
            return function (event) {
                event.stopPropagation()
                if (event.target.tagName == 'DIV' && event.target.classList.contains('jtk-overlay')) {
                    if (!conn.hasType('selected')) {
                        vm._ins_.deleteConnection(conn)
                        vm.unbindDelConnBtn(conn)
                    }
                }
            }
        }
        $(document)
            .on('click' + namespace, handler())
            .on('keyup' + namespace, function (event) {
                event.stopPropagation()
                // TODO windows下再调试 delete 键删除功能
                // if(e.target.classList.contains('jtk-overlay'))
                if (event.keyCode == 46) {
                    vm._ins_.deleteConnection(conn)
                }
            })
    },
    /**
     * 解绑删除连线按钮事件
     */
    unbindDelConnBtn(conn) {
        let namespace = "." + conn.id
        $(document).off(namespace)
    },
    /**
     * 单击连接器事件
     * @param {} conn 
     */
    handleConnClick(conn, e) {
        this._np_.connections.forEach(c => {
            if (c.id == conn.id) {
                this.unbindDelConnBtn(conn)
                this.bindDelConnBtn(conn, e)
                conn.toggleType('selected')
            } else {
                if (c.getType().indexOf('selected') != -1) {
                    c.toggleType('selected')
                }
                this.unbindDelConnBtn(c)
            }
            // c.endpoints[0].toggleType('selected')
        })
    },
    /**
     * 连接运行器
     * @param {} conn 
     */
    runingConnector(options = {
        duration:300, // 刷新时间
        gap:10, // 线段之间的间隙
        length1: 10,// 第一段线段长度
        length2: 30,// 第二段线段长度
        length: 20,// 后续线段长度
        maxCount:10000// 线段段数，
    }) {
        let vm = this
        let runners = [] // 保存正在运行的连接器
        let count = 0
        let _timer = null
        let $connectors = $('.jce-connector-running path')

        function createLines (length) {
            // 生成线段数
            let _count = 0;
            let arr = [length,options.gap];
            while (_count < options.maxCount) {
                arr.push(options.length,options.gap);
                _count++
            };
            return arr.join(',')
        }

        let start = function () {
            function fn () {
                if (count % 2 == 0) {
                    $connectors.css('stroke-dasharray', createLines(options.length1))
                } else {
                    $connectors.css('stroke-dasharray', createLines(options.length2))
                }; count++
                stop()
                start()
            }
            _timer = setTimeout(fn, options.duration)
         }
        let stop = function () {
            _timer && window.clearTimeout(_timer)
        }
        stop()
        start()
    },
}