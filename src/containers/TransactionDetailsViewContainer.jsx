import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// component
import TransactionDetailsView from '../components/TransactionDetailsView';
// actions
import { getTransactionByHash } from '../redux/transactionActions';


export default withRouter(
    connect(
        (state, ownProps) => {
            return {
                data: ownProps.match.params.transactionDataHash && state.transactionReducer.data[ownProps.match.params.transactionDataHash],
                isLoading: state.transactionReducer.isLoading,
                error: state.transactionReducer.error
            };
        }, 
        {getTransactionByHash}
    )(TransactionDetailsView)
);