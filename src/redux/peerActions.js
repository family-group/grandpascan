export const actions = {
    GET_PEERS: 'GET_PEERS',
    GET_NODE_INFO: 'GET_NODE_INFO'
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