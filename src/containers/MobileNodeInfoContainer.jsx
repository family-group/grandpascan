import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// component
import MobileNodeInfo from '../components/MobileNodeInfo';
import { getPeers, getNodeInfo } from '../redux/peerActions';


export default withRouter(
    connect(
        state => {
            return {
                peerIds: state.peerReducer.peerIds,
                isPeerLoading: state.peerReducer.isLoading,
                peersError: state.peerReducer.error,
                nodeInfo: state.peerReducer.nodeInfo,
                isNodeInfoLoading: state.peerReducer.isNodeInfoLoading,
                nodeInfoError: state.peerReducer.nodeInfoError
            };
        }, 
        {getPeers, getNodeInfo}
    )(MobileNodeInfo)
);