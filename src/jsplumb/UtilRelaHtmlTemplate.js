/**
 * Util.js 方法中用到的html字符串模版
 */
export default {
    // 流程图中的节点
    FlowchartNode (dragEle) {
        switch (dragEle.type) {
            default :
              return `<div id="${dragEle.uuid}" class="jce-node jce-node-standard"><h1>${dragEle.extendInfo.name}</h1></div>`
        }
    },
    // 属性配置框
    ConfigProp:{}
}