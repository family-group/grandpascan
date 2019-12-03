import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// component
import BlocksView from '../components/BlocksView';
// actions
import { getBlocks } from '../redux/blockActions';


export default withRouter(
    connect(
        (state, ownProps) => {
            return {
                ids: state.blockReducer.blockIds,
                isLoading: state.blockReducer.isLoading,
                isEmpty: state.blockReducer.isEmpty,
                error: state.blockReducer.error
            };
        }, 
        {getBlocks}
    )(BlocksView)
);