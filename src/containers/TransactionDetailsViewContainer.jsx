import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// component
import TransactionDetailsView from '../components/TransactionDetailsView';
// actions
import { getTransactionByHash } from '../redux/transactionActions';
import { cleanHexNotation } from '../utils/granpaCoinFunctions';


export default withRouter(
    connect(
        (state, ownProps) => {
            return {
                data: ownProps.match.params.transactionDataHash && state.transactionReducer.data[cleanHexNotation(ownProps.match.params.transactionDataHash.trim())],
                isLoading: state.transactionReducer.isLoading,
                error: state.transactionReducer.error
            };
        }, 
        {getTransactionByHash}
    )(TransactionDetailsView)
);