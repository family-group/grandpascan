import React from 'react';
// importing styles
import './styles/TransactionsView.css';
// importing utils
import Xhr from '../utils/Xhr';
// importing components
import TableData from './TableData';
// importing columns
import { transactionsViewData } from '../components-data/transactionsViewData';
import { toGrandpaCoin } from '../utils/granpaCoinFunctions';;

class AddressTransactionsView extends React.Component {
    constructor() {
        super();
        this.getTransactionsViewContainerRef = this.getTransactionsViewContainerRef.bind(this);
        this.getTransactionsViewContainerWidth = this.getTransactionsViewContainerWidth.bind(this);
        this.getAllAddressTransactions = this.getAllAddressTransactions.bind(this);
        this.goHome = this.goHome.bind(this);
    }
    componentDidMount() {
        this.getAllAddressTransactions();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.address !== this.props.match.params.address) {
            this.getAllAddressTransactions();
        }
    }
    componentWillUnmount() {
        if(this.transactionsRequest) this.transactionsRequest.abort();
    }
    getAllAddressTransactions() {
        const { address } = this.props.match.params;
        this.transactionsRequest = new Xhr(`address/${address}/transactions`);
        this.props.getAddressTransactions(this.transactionsRequest, address);
    }
    getTransactionsViewContainerRef(el) {
        if (el) this.transactionsViewContainerRef = el;
    }
    getTransactionsViewContainerWidth() {
        if (this.transactionsViewContainerRef) {
            return parseInt(getComputedStyle(this.transactionsViewContainerRef).width);
        }
    }
    goHome() {
        this.props.history.push('/');
    }
    renderBalance() {
        const { addressBalance } = this.props;
        if (addressBalance) {
            return (
                <React.Fragment>
                    <p className="balance ellipsis">Confirmed Balance: {toGrandpaCoin(addressBalance.confirmedBalance)}</p>
                    <p className="balance ellipsis">Pending Balance: {toGrandpaCoin(addressBalance.pendingBalance)}</p>
                    <p className="balance ellipsis">Safe Balance: {toGrandpaCoin(addressBalance.safeBalance)}</p>
                </React.Fragment>
            );
        }
    }
    render() {
        console.log('AddressTransactionsView')
        const { ids, isLoading, error, isEmpty } = this.props;
        return (
            <main className="main-container flex-row">
                <div 
                    ref={this.getTransactionsViewContainerRef} 
                    className="address-transactions-view-container">
                    <h2 className="ellipsis">Address: {this.props.match.params.address}</h2>
                    {this.renderBalance()}
                    <h3>Transactions</h3>
                    {
                        ids &&
                            (<p>{ids.length} Transactions found.</p>)
                    }
                    <TableData
                        data={ids}
                        columns={transactionsViewData}
                        className={isLoading || error ? 'transactions-list-container flex-axis-centered spacer-lg' : 'transactions-list-container flex-column'}
                        tableContainerWidth={this.getTransactionsViewContainerWidth}
                        isLoading={isLoading}
                        error={error}
                        isEmpty={isEmpty}
                        retryFunction={this.goHome}
                    >
                        
                    </TableData>
                </div>
            </main>
        );
    }
}
export default AddressTransactionsView;