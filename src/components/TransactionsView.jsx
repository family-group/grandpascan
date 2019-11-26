import React from 'react';
// importing styles
import './styles/TransactionsView.css';
// importing utils
import Xhr from '../utils/Xhr';
// importing components
import TableData from './TableData';
// importing columns
import { transactionsViewData } from '../components-data/transactionsViewData';

class TransactionsView extends React.Component {
    constructor() {
        super();
        this.getTransactionsViewContainerRef = this.getTransactionsViewContainerRef.bind(this);
        this.getTransactionsViewContainerWidth = this.getTransactionsViewContainerWidth.bind(this);
        this.getAllTransactions = this.getAllTransactions.bind(this);
    }
    componentDidMount() {
        this.getAllTransactions();
    }
    componentWillUnmount() {
        if(this.transactionsRequest) this.transactionsRequest.abort();
    }
    getAllTransactions() {
        this.transactionsRequest = new Xhr('transactions');
        this.props.getTransactions(this.transactionsRequest);
    }
    getTransactionsViewContainerRef(el) {
        if (el) this.TransactionsViewContainerRef = el;
    }
    getTransactionsViewContainerWidth() {
        if (this.TransactionsViewContainerRef) {
            return parseInt(getComputedStyle(this.TransactionsViewContainerRef).width);
        }
    }
    render() {
        console.log('TransactionsView')
        const { ids, isLoading, error, isEmpty } = this.props;
        return (
            <main className="full-width">
                <div ref={this.getTransactionsViewContainerRef} className="transactions-view-container">
                    <h2 className="">Transactions</h2>
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
                        retryFunction={this.getAllTransactions}
                    >
                        
                    </TableData>
                </div>
            </main>
        );
    }
}
export default TransactionsView;