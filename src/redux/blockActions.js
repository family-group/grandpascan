export const actions = {
    GET_BLOCKS: 'GET_BLOCKS',
    GET_BLOCK_BY_HASH: 'GET_BLOCK_BY_HASH'
};

export function getBlocks(request) {
    return {
        type: actions.GET_BLOCKS,
        payload: request.result()
    }
}
export function getBlockByHash(request) {
    return {
        type: actions.GET_BLOCK_BY_HASH,
        payload: request.result()
    }
}