import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// component
import TableDataRow from '../components/TableDataRow';


export default withRouter(
    connect(
        (state, ownProps) => {
            return {
                data: state.transactionReducer.data[ownProps.id] || state.blockReducer.data[ownProps.id] || state.peerReducer.data[ownProps.id]
            };
        }, 
        null
    )(TableDataRow)
);