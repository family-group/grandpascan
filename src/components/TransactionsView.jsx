import React from 'react';
// importing styles
import './styles/TransactionsView.css';
// importing utils
import Xhr from '../utils/Xhr';
// importing components
import TableData from './TableData';

class TransactionsView extends React.Component {
    constructor() {
        super();
        this.getTransactionsViewContainerRef = this.getTransactionsViewContainerRef.bind(this);
        this.getTransactionsViewContainerWidth = this.getTransactionsViewContainerWidth.bind(this);
        this.getAllTransactions = this.getAllTransactions.bind(this);
        this.transactionLabels = {
            transactionDataHash: 'Hash',
            dateCreated: 'Date created',
            from: 'From',
            to: 'To',
            value: 'Value',
            fee: 'Fee',
            minedInBlockIndex: 'Mined in block index',
            data: 'Data'
        };
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
        if (el) {
            this.TransactionsViewContainerRef = el;
        }
    }
    getTransactionsViewContainerWidth() {
        if (this.TransactionsViewContainerRef) {
            return parseInt(getComputedStyle(this.TransactionsViewContainerRef).width);
        }
    }
    render() {
        console.log('TransactionsView')
        const { ids, isLoading, error } = this.props;
        return (
            <main className="full-width">
                <div ref={this.getTransactionsViewContainerRef} className="transactions-view-container">
                    <h2 className="">Transactions</h2>
                    {
                        ids &&
                            (
                                <p>{ids.length} Transactions found.</p>
                            )
                    }
                    <TableData
                        data={ids}
                        labels={this.transactionLabels}
                        className={isLoading || error ? 'transactions-list-container flex-axis-centered spacer-lg' : 'transactions-list-container flex-column'}
                        tableContainerWidth={this.getTransactionsViewContainerWidth}
                        isLoading={isLoading}
                        error={error}
                        retryFunction={this.getAllTransactions}
                    >
                        
                    </TableData>
                </div>
            </main>
        );
    }
}
export default TransactionsView;