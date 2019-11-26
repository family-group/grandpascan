import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// component
import HomeViewSideElement from '../components/HomeViewSideElement';


export default withRouter(
    connect(
        (state, ownProps) => {
            return {
                blockData: (state.blockReducer.blockIds[0] && state.blockReducer.data[state.blockReducer.blockIds[0]]) && state.blockReducer.data[state.blockReducer.blockIds[0]],
                isBlockLoading: state.blockReducer.isLoading,
                transactionData: (state.transactionReducer.transactionIds[0] && state.transactionReducer.data[state.transactionReducer.transactionIds[0]]) && state.transactionReducer.data[state.transactionReducer.transactionIds[0]],
                isTransactionLoading: state.transactionReducer.isLoading
            };
        }, 
        null
    )(HomeViewSideElement)
);