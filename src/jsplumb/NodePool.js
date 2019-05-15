// 流程节点池
import Util from './Util'
var NodePool = function (){
    this.nodes = [] // 用于放置所有节点
    this.connections = [] // 用于放置所有的连线
    this.nodeMap = new Map() // 用于放置有关联的节点映射关系

    /**
     * 连接之前判断是否已经有此连接
     */
    this.beforeDrop = function(info){
        console.log(info)
        let sourceId = info.sourceId
        let endpointConnections = this.nodeMap.get(sourceId).endpointConnections
        let targetEndpointUuid = info.dropEndpoint._jsPlumb.uuid
        if(endpointConnections.some(item => item.targetEndpointUuid == targetEndpointUuid)){
            return false
        }else {
            return true
        }
    }
    /**
     * 往connectoins中添加连接
     * flag: 是否是根据数据重绘 
     */
    this.addConn = function(info){
        //connections: [{sourceUuid: [targetUuids]}]
        let conn = {}
        let sourceId = info.sourceId
        let targetId = info.targetId
        let connections = this.nodeMap.get(sourceId).connections
        let endpointConnections = this.nodeMap.get(sourceId).endpointConnections
        let connection = connections.find(item => !!item[sourceId])
        let sourceEndpointUuid = info.sourceEndpoint._jsPlumb.uuid
        let targetEndpointUuid = info.targetEndpoint._jsPlumb.uuid
        let conns = this.connections

        function pushPoint () {
            //保存节点间的连接关系
            if(!endpointConnections.some(item => ((item.sourceEndpointUuid == sourceEndpointUuid) && (item.targetEndpointUuid == targetEndpointUuid)) )){
                endpointConnections.push({
                    sourceEndpointUuid,
                    targetEndpointUuid
                })
                conns.push(info.connection)
            }
        }
        pushPoint()
        if(!connection){
            conn[sourceId] = [targetId]
            connections.push(conn)
        }else{
            if(!connection[sourceId].some(item => item == targetId)){
                connection[sourceId].push(targetId)
            }
        }
        Util.runingConnector()
        console.log(this.nodeMap,this.connections)
    }

        // 往connectoins中删除连接
    this.delConn = function(info) {
            // 去掉连接
        console.log('去掉连接： ',info)
        let sourceId = info.sourceId
        let targetId = info.targetId
        let connections = this.nodeMap.get(sourceId).connections
        let endpointConnections = this.nodeMap.get(sourceId).endpointConnections
        let connection = connections.find(item => !!item[sourceId])
        let _index = connection[sourceId].indexOf(targetId)
        let _endpointIndex = -1
        endpointConnections.forEach((item,index) => {
            if(item.targetEndpointUuid == info.targetEndpoint._jsPlumb.uuid){
                _endpointIndex = index
            }
        })
        if(_index != -1) connection[sourceId].splice(_index,1)
        if(_endpointIndex != -1) {
            endpointConnections.splice(_endpointIndex,1)
            this.connections.splice(_endpointIndex,1)
        }
        console.log(this.nodeMap)
    }
}

export default NodePool