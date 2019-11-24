import { actions } from './blockActions';
import { payloadFormater } from '../utils/reduxFunctions';

const initialState = {
    isLoading: false,
    blockIds: [],
    data: {},
    isEmpty: false,
    error: false
};


function blockReducer(state = initialState, action = null) {
    let payload;
    switch (action.type) {
       case actions.GET_BLOCKS + '_START':
           return {
               ...state,
               isLoading: true,
               error: false
           };
       case actions.GET_BLOCKS + '_SUCCESS':
           payload = payloadFormater(action, 'blockHash')
           return {
               ...state,
               isLoading: false,
               data: {...payload.data, ...state.data},
               blockIds: payload.ids.reverse(),
               isEmpty: payload.ids.length === 0
           };
       case actions.GET_BLOCKS + '_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
       case actions.GET_BLOCK_BY_HASH + '_START':
           return {
               ...state,
               isLoading: true,
               error: false
           };
       case actions.GET_BLOCK_BY_HASH + '_SUCCESS':
           payload = payloadFormater(action, 'blockHash')
           return {
               ...state,
               isLoading: false,
               data: {...payload.data, ...state.data},
               blockIds: payload.ids
           };
       case actions.GET_BLOCK_BY_HASH + '_ERROR':
           return {
               ...state,
               isLoading: false,
               error: action.payload
           }
        default:
            return state;
    }
}
export default blockReducer;