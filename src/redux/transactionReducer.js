import { actions } from './transactionActions';
import { payloadFormater } from '../utils/reduxFunctions';

const initialState = {
    isLoading: false,
    transactionIds: [],
    data: {},
    isEmpty: false,
    error: false
};


function transactionReducer(state = initialState, action = null) {
    let payload;
    switch (action.type) {
       case actions.GET_TRANSACTIONS + '_START':
           return {
               ...state,
               isLoading: true,
               error: false
           };
       case actions.GET_TRANSACTIONS + '_SUCCESS':
           payload = payloadFormater(action.payload, 'transactionDataHash')
           return {
               ...state,
               isLoading: false,
               data: {...payload.data, ...state.data},
               transactionIds: payload.ids,
               isEmpty: payload.ids.length === 0
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
                }
        default:
            return state;
    }
}
export default transactionReducer;