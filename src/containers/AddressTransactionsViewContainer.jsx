import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// component
import AddressTransactionsView from '../components/AddressTransactionsView';
// actions
import { getAddressTransactions } from '../redux/transactionActions';
import { cleanHexNotation } from '../utils/granpaCoinFunctions';


export default withRouter(
    connect(
        (state, ownProps) => {
            return {
                ids: ownProps.match.params.address && state.transactionReducer.data[cleanHexNotation(ownProps.match.params.address)],
                isLoading: state.transactionReducer.isLoading,
                isEmpty: state.transactionReducer.isEmpty,
                error: state.transactionReducer.error,
                addressBalance: ownProps.match.params.address && state.balanceReducer.data[cleanHexNotation(ownProps.match.params.address)]
            };
        }, 
        {getAddressTransactions}
    )(AddressTransactionsView)
);