export const actions = {
    GET_TRANSACTIONS: 'GET_TRANSACTIONS',
    GET_TRANSACTION_BY_HASH: 'GET_TRANSACTION_BY_HASH'
};

export function getTransactions(request) {
    return {
        type: actions.GET_TRANSACTIONS,
        payload: request.result()
    }
}
export function getTransactionByHash(request) {
    return {
        type: actions.GET_TRANSACTION_BY_HASH,
        payload: request.result()
    }
}