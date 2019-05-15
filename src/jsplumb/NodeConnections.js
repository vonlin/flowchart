/**
 * 注册每种类型的连接线的样式
 */
export default {
    "standard":{ paintStyle:{ stroke:"green", strokeWidth:5 },cssClass:'jce-connector-running',
        connectorOverlays:[ 
        [ "PlainArrow", { width:15, length:20, location:1, id:"arrow" } ],
        [ "Label", { label:"foo", id:"label" } ]
    ]},
    "type_1":{ paintStyle:{ stroke:"blue", strokeWidth:10 } },
    "selected":{ paintStyle:{ stroke:"blue", strokeWidth:6},cssClass:'jce-connector-selected'},  // 连接器选中状态
    "running":{ paintStyle:{ stroke:"green", strokeWidth:6},cssClass:'jce-connector-running'}  // 连接器运行中状态
    // "type_3":{ paintStyle: { stroke:"${color}", strokeWidth:"${width}" } }
}