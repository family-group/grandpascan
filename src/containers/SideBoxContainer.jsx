import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// component
import SideBox from '../components/SideBox';


export default withRouter(
    connect(
        (state, ownProps) => {
            return {
                data: ownProps.type === 'BLOCK' ? state.blockReducer.data[ownProps.id] : state.transactionReducer.data[ownProps.id]
            };
        }, 
        null
    )(SideBox)
);