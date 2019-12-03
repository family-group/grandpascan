import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// component
import PeersView from '../components/PeersView';
// actions
import { getPeers } from '../redux/peerActions';


export default withRouter(
    connect(
        state => {
            return {
                ids: state.peerReducer.peerIds,
                isLoading: state.peerReducer.isLoading,
                isEmpty: state.peerReducer.isEmpty,
                error: state.peerReducer.error
            };
        }, 
        {getPeers}
    )(PeersView)
);