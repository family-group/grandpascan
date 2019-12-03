export const actions = {
    GET_PEERS: 'GET_PEERS',
    GET_NODE_INFO: 'GET_NODE_INFO',
    ADD_NEW_PEER: 'ADD_NEW_PEER',
    REMOVE_PEER: 'REMOVE_PEER',
    ADD_NEW_NODE_INFO: 'ADD_NEW_NODE_INFO'
};

export function getPeers(request) {
    return {
        type: actions.GET_PEERS,
        payload: request.result()
    }
}
export function getNodeInfo(request) {
    return {
        type: actions.GET_NODE_INFO,
        payload: request.result()
    }
}
export function addNewNodeInfo(nodeInfo) {
    return {
        type: actions.ADD_NEW_NODE_INFO,
        nodeInfo
    }
}
export function addNewPeer(peer) {
    return {
        type: actions.ADD_NEW_PEER,
        peer
    };
}
export function removePeer(nodeUrl) {
    return {
        type: actions.REMOVE_PEER,
        nodeUrl
    };
}