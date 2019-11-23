import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// component
import Aside from '../components/Aside';


export default withRouter(
    connect(
        (state, ownProps) => {
            return {
                blockId: state.blockReducer.blockIds[0] && state.blockReducer.blockIds[0],
                isBlockLoading: state.blockReducer.isLoading,
                transactionId: state.transactionReducer.transactionIds[0] && state.transactionReducer.transactionIds[0],
                isTransactionLoading: state.transactionReducer.isLoading
            };
        }, 
        null
    )(Aside)
);