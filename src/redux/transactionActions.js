import { storeAddressBalance } from './balanceActions';

export const actions = {
    GET_TRANSACTIONS: 'GET_TRANSACTIONS',
    GET_TRANSACTION_BY_HASH: 'GET_TRANSACTION_BY_HASH',
    GET_ADDRESS_TRANSACTIONS: 'GET_ADDRESS_TRANSACTIONS',
    ADD_NEW_TRANSACTIONS: 'ADD_NEW_TRANSACTIONS',
    ADD_NEW_PENDING_TRANSACTION: 'ADD_NEW_PENDING_TRANSACTION'
};

export function getTransactions(request, status = 'confirmed') {
    return {
        type: actions.GET_TRANSACTIONS,
        payload: request.result(),
        meta: {status}
    }
}
export function getTransactionByHash(request) {
    return {
        type: actions.GET_TRANSACTION_BY_HASH,
        payload: request.result()
    }
}
export function addNewTransactions(transactions) {
    return {
        type: actions.ADD_NEW_TRANSACTIONS,
        transactions
    };
}
export function addNewPendingTransactions(transaction) {
    return {
        type: actions.ADD_NEW_PENDING_TRANSACTION,
        transaction
    };
}
export function getAddressTransactions(request, address) {
    if (!address) return console.error(new Error('Second argument required.'));
    return dispatch => {
        return dispatch({
            type: actions.GET_ADDRESS_TRANSACTIONS,
            payload: request.result().then(res => {
                dispatch(storeAddressBalance(address, res.balance));
                return res;
            }),
            meta: {address}
        })
    }
}