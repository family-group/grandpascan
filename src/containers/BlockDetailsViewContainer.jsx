import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// component
import BlockView from '../components/BlockDetailsView';
// actions
import { getBlockByHash } from '../redux/blockActions';


export default withRouter(
    connect(
        (state, ownProps) => {
            return {
                data: ownProps.match.params.blockHash && state.blockReducer.data[ownProps.match.params.blockHash],
                isLoading: state.blockReducer.isLoading,
                error: state.blockReducer.error
            };
        }, 
        {getBlockByHash}
    )(BlockView)
);