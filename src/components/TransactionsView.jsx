import React from 'react';
// importing styles
import './styles/TransactionsView.css';
// importing utils
import Xhr from '../utils/Xhr';
// importing components
import TableData from './TableData';
// importing columns
import { transactionsViewData } from '../components-data/transactionsViewData';
import Link from './Link';

class TransactionsView extends React.Component {
    constructor() {
        super();
        this.getTransactionsViewContainerRef = this.getTransactionsViewContainerRef.bind(this);
        this.getTransactionsViewContainerWidth = this.getTransactionsViewContainerWidth.bind(this);
        this.getAllTransactions = this.getAllTransactions.bind(this);
        this.goTransactionsHome = this.goTransactionsHome.bind(this);
    }
    componentDidMount() {
        this.getAllTransactions();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.getAllTransactions();
        }
    }
    componentWillUnmount() {
        if(this.pendintTransactionsRequest) this.pendintTransactionsRequest.abort();
        if(this.confirmedTransactions) this.confirmedTransactions.abort();
    }
    getAllTransactions() {
        const endpoint = this.props.location.pathname === '/transactions' ? 'transactions/confirmed' : 'transactions/pending';
        this.transactionsRequest = new Xhr(endpoint);

        this.props.getTransactions(this.transactionsRequest, this.props.location.pathname === '/transactions' ? 'confirmed' : 'pending');
    }
    getTransactionsViewContainerRef(el) {
        if (el) this.TransactionsViewContainerRef = el;
    }
    getTransactionsViewContainerWidth() {
        if (this.TransactionsViewContainerRef) {
            return parseInt(getComputedStyle(this.TransactionsViewContainerRef).width);
        }
    }
    goTransactionsHome() {
        if (this.props.location.pathname === '/transactions') {
            this.props.history.push('/');
        } else {
            this.props.history.push('/transactions');
        }
    }
    render() {
        console.log('TransactionsView')
        const { ids, isLoading, error, isEmpty, location} = this.props;
        return (
            <main className="full-width">
                <div ref={this.getTransactionsViewContainerRef} className="transactions-view-container">
                    <p>
                        <Link to={location.pathname === '/transactions' ? '/transactions/pending' : '/transactions'}>
                            {location.pathname === '/transactions' ? 'View pending transactions' : 'View confirmed transactions'} 
                        </Link>
                    </p>
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
                        buttonMessage={location.pathname === '/transactions' ? 'Go Home' : 'Go to confirmed transactions'}
                        errorMessage={location.pathname === '/transactions' ? 'No confirmed transactions yet.' : 'No pending transactions yet.'}
                        retryFunction={this.goTransactionsHome}
                    />
                </div>
            </main>
        );
    }
}
export default TransactionsView;