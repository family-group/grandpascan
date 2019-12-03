import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// component
import LatestSingleOperation from '../components/LatestSingleOperation';


export default withRouter(
    connect(
        (state, ownProps) => {
            return {
                data: ownProps.type === 'BLOCK' ? state.blockReducer.data[ownProps.id] : state.transactionReducer.data[ownProps.id]
            };
        }, 
        null
    )(LatestSingleOperation)
);