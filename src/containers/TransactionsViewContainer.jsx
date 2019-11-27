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
                ids: ownProps.location.pathname === '/transactions' ? state.transactionReducer.confirmedTransactionIds : state.transactionReducer.pendingTransactionIds,
                isLoading: state.transactionReducer.isLoading,
                isEmpty: state.transactionReducer[ownProps.location.pathname === '/transactions' ? 'areConfirmedEmpty' : 'arePendingEmpty'],
                error: state.transactionReducer.error
            };
        }, 
        {getTransactions}
    )(TransactionsView)
);