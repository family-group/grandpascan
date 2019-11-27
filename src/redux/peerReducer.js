import { actions } from './peerActions';
import { payloadFormater } from '../utils/reduxFunctions';

const initialState = {
    isLoading: false,
    peerIds: [],
    data: {},
    isEmpty: false,
    error: false,
    nodeInfo: {},
    isNodeInfoLoading: false,
    nodeInfoError: false
};


function peerReducer(state = initialState, action = null) {
    let payload;
    switch (action.type) {
       case actions.GET_PEERS + '_START':
           return {
               ...state,
               isLoading: true,
               error: false,
               isEmpty: false
           };
       case actions.GET_PEERS + '_SUCCESS':
            payload = payloadFormater(action.payload, 'nodeId', 'object');
           return {
               ...state,
               peerIds: payload.ids,
               data: {...payload.data, ...state.data},
               isLoading: false,
               isEmpty: payload.ids.length === 0
           };
       case actions.GET_PEERS + '_ERROR':
           return {
               ...state,
               isLoading: false,
               error: true
           };
       case actions.GET_NODE_INFO + '_START':
           return {
               ...state,
               isNodeInfoLoading: true,
               nodeInfoError: false
           };
       case actions.GET_NODE_INFO + '_SUCCESS':
           return {
               ...state,
               nodeInfo: action.payload,
               isNodeInfoLoading: false
           };
       case actions.GET_NODE_INFO + '_ERROR':
           return {
               ...state,
               isNodeInfoLoading: false,
               nodeInfoError: true
           };
        default:
            return state;
    }
}
export default peerReducer;