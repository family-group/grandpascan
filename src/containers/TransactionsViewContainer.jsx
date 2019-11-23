import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// component
import TransactionsView from '../components/TransactionsView';
// actions
import { getTransactions } from '../redux/transactionActions';


export default withRouter(
    connect(
        (state, ownProps) => {
            return {
                ids: state.transactionReducer.transactionIds,
                isLoading: state.transactionReducer.isLoading,
                isEmpty: state.transactionReducer.isEmpty,
                error: state.transactionReducer.error
            };
        }, 
        {getTransactions}
    )(TransactionsView)
);