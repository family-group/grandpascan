import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// component
import LatestOperations from '../components/LatestOperations';
// actions
import { getBlocks } from '../redux/blockActions';
import { getTransactions } from '../redux/transactionActions';


export default withRouter(
    connect(
        (state, ownProps) => {
            return {
                ids: ownProps.type === 'BLOCK' ? state.blockReducer.blockIds : state.transactionReducer.transactionIds,
                isLoading: ownProps.type === 'BLOCK' ? state.blockReducer.isLoading : state.transactionReducer.isLoading,
                isEmpty: ownProps.type === 'BLOCK' ? state.blockReducer.isEmpty : state.transactionReducer.isEmpty,
                error: ownProps.type === 'BLOCK' ? state.blockReducer.error : state.transactionReducer.error
            };
        }, 
        {
            getBlocks,
            getTransactions
        }
    )(LatestOperations)
);