import React from 'react';
// importing styles
import './styles/BlockDetailsView.css';
// importing utils
import Xhr from '../utils/Xhr';
import DetailsBox from './DetailsBox';

class TransactionDetailsView extends React.Component {
    constructor() {
        super();
        this.transactionLabels = {
            from: {label: 'From', linkTo: '/address'},
            to: {label: 'To', linkTo: '/address'},
            value: {label: 'Value', type: 'coin'},
            fee: {label: 'Fee'},
            dateCreated: {label: 'Date created', type: 'date'},
            data: {label: 'Data'},
            senderPubKey: {label: 'Sender Public key'},
            transactionDataHash: {label: 'Transaction data hash', linkTo: '/transaction'},
            minedInBlockIndex: {label: 'Mined in block index'},
            transferSuccessful: {label: 'Transfer successful', capitalize: true}
        }
        this.getTransaction = this.getTransaction.bind(this);
    }
    componentDidMount() {
        if (!this.props.data) {
            this.getTransaction();
        }
    }
    getTransaction() {
        this.transactionDataRequest = new Xhr(`transaction/${this.props.match.params.transactionDataHash}`);
        this.props.getTransactionByHash(this.transactionDataRequest);
    }

    render() {
        console.log('TransactionDetailsView')
        return (
            <main className="full-width">
                <div className="show-block-main-content-container">
                    <h2 className="block-hash">
                        Transaction # {this.props.data ? this.props.data.transactionDataHash : ''}
                    </h2>
                    <DetailsBox 
                        data={this.props.data}
                        labels={this.transactionLabels}
                        error={this.props.error}
                        isLoading={this.props.isLoading}
                    />
                </div> 
            </main>
        )
    }
}
export default TransactionDetailsView;