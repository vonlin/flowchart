// 流程节点的基本属性
/**
    Anchor 锚点，即端点链接的位置
    Anchors 多个锚点 [源锚点，目标锚点].
    Connector 链接
    ConnectionsDetachable 节点是否可以用鼠标拖动使其断开，默认为true。即用鼠标链接上的连线，也可以使用鼠标拖动让其断开。设置成false，可以让其拖动也不会自动断开。
    Container 连线的容器
    DoNotThrowErrors 是否抛出错误
    ConnectionOverlays 链接遮罩层
    DragOptions 拖动设置
    DropOptions 拖放设置
    Endpoint 端点
    Endpoints 数组形式的，[源端点，目标端点]
    EndpointOverlays 端点遮罩层
    EndpointStyle 端点样式
    EndpointStyles [源端点样式，目标端点样式]
    EndpointHoverStyle 端点鼠标经过的样式
    EndpointHoverStyles [源端点鼠标经过样式，目标端点鼠标经过样式]
    HoverPaintStyle 鼠标经过链接线时的样式
    LabelStyle 标签样式
    LogEnabled 是否启用日志
    Overlays 连接线和端点的遮罩层样式
    MaxConnections 端点最大连接线数量默认为1， 设置成-1可以表示无数个链接
    PaintStyle 连线样式
    ReattachConnections 端点是否可以再次重新链接
    RenderMode 渲染模式，默认是svg
    Scope 作用域，用来区分哪些端点可以链接，作用域相同的可以链接
 */
export const nodeBaseProperties = {
    maxConnections:-1,
    // connector:[ "Flowchart",{
    //     cornerRadius:5,
    //     alwaysRespectStubs:true,
    //     midpoint:.8
    // }],
    connector:['Bezier'],
    endpoint:[ "Dot", { radius:10 } ],
    endpointStyle : { fill: "red"  },
    cssClass:['jce-endpoint-inner'],
    anchor : [ 1, 0.5, 0, 0 ],
    overlays:[
        [ "Label", { label:"foo", id:"label", location:[-0.5, -0.5] } ]
        ],
        connectorOverlays:[ 
        [ "PlainArrow", { width:15, length:20, location:1, id:"arrow" } ],
        [ "Label", { label:"foo", id:"label" } ]
    ]
}

/**
 * 外层端点区域 模拟热区
 */
export const outerNodeBaseProperties = {
    endpoint:["Dot", { radius:20 }],
    endpointStyle : { fill: "transparent"  },
    endpointHoverStyle:{
        fill:'blue'
    },
    cssClass:['jce-endpoint-outer']
}

/**
 * 定义每种节点类型的样式
 */
export const nodeBasePropertiesForType_1 = {
    maxConnections:-1,
    connector:[ "Flowchart"],
    endpoint:[ "Dot", { radius:10 } ],
    endpointStyle : { fill: "red"  },
    cssClass:['jce-endpoint-inner'],
    anchor : [ 1, 0.5, 0, 0 ]
}

/**
 * 默认配置
 */
export const importDefaults = {
    PaintStyle:{ 
        strokeWidth:6, 
        stroke:"orange", 
        outlineStroke:"orange", 
        outlineWidth:1
    },
    MaxConnections:-1,
    Connector:[ "Flowchart"],
    Endpoint:[ "Dot", { radius:10 } ],
    EndpointStyle : { fill: "red"  },
    Anchor : [ 1, 0.5, 0, 0 ]
}