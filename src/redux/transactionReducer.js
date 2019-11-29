import { actions } from './transactionActions';
import { payloadFormater } from '../utils/reduxFunctions';

const initialState = {
    isLoading: false,
    pendingTransactionIds: [],
    confirmedTransactionIds: [],
    data: {},
    arePendingEmpty: false,
    areConfirmedEmpty: false,
    error: false
};


function transactionReducer(state = initialState, action = null) {
    let payload;
    let transactions;
    switch (action.type) {
       case actions.GET_TRANSACTIONS + '_START':
           return {
               ...state,
               isLoading: true,
               error: false,
               [action.meta.status === 'confirmed' ? 'areConfirmedEmpty' : 'arePendingEmpty']: false
           };
       case actions.GET_TRANSACTIONS + '_SUCCESS':
           payload = payloadFormater(action.payload, 'transactionDataHash');
           
           return {
               ...state,
               isLoading: false,
               data: {...payload.data, ...state.data},
               [action.meta.status === 'confirmed' ? 'confirmedTransactionIds' : 'pendingTransactionIds']: payload.ids,
               [action.meta.status === 'confirmed' ? 'areConfirmedEmpty' : 'arePendingEmpty']: payload.ids.length === 0
           };
        case actions.GET_TRANSACTIONS + '_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
            case actions.GET_TRANSACTION_BY_HASH + '_START':
                return {
                    ...state,
                    isLoading: true,
                    error: false
                };
            case actions.GET_TRANSACTION_BY_HASH + '_SUCCESS':
                payload = payloadFormater(action.payload, 'transactionDataHash')
                return {
                    ...state,
                    isLoading: false,
                    data: {...payload.data, ...state.data},
                    transactionIds: payload.ids
                };
            case actions.GET_TRANSACTION_BY_HASH + '_ERROR':
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload
                }
            case actions.GET_ADDRESS_TRANSACTIONS + '_START':
                return {
                    ...state,
                    isLoading: true,
                    error: false
                };
            case actions.GET_ADDRESS_TRANSACTIONS + '_SUCCESS':
                payload = payloadFormater(action.payload.transactions, 'transactionDataHash')
                return {
                    ...state,
                    isLoading: false,
                    data: {
                        ...state.data,
                        ...payload.data,
                        [action.meta.address] : payload.ids
                    },
                    isEmpty: payload.ids.length === 0
                };
            case actions.GET_ADDRESS_TRANSACTIONS + '_ERROR':
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload
                };
            case actions.ADD_NEW_TRANSACTIONS:
                transactions = action.transactions.sort((actual, next) => Date.parse(next.dateCreated) - Date.parse(actual.dateCreated));
                payload = payloadFormater(transactions, 'transactionDataHash');

                return {
                    ...state,
                    confirmedTransactionIds: [...payload.ids, ...state.confirmedTransactionIds],
                    data: {
                        ...state.data,
                        ...payload.data
                    }
                };
            case actions.ADD_NEW_PENDING_TRANSACTION:
                transactions = action.transactions.sort((actual, next) => Date.parse(next.dateCreated) - Date.parse(actual.dateCreated));
                payload = payloadFormater(transactions, 'transactionDataHash');

                return {
                    ...state,
                    pendingTransactionIds: [...payload.ids, ...state.pendingTransactionIds],
                    data: {
                        ...state.data,
                        ...payload.data
                    }
                };
        default:
            return state;
    }
}
export default transactionReducer;