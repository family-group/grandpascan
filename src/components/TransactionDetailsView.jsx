import React from 'react';
// importing styles
import './styles/BlockDetailsView.css';
// importing utils
import Xhr from '../utils/Xhr';
import DetailsBox from './DetailsBox';
import { denoteHex } from '../utils/granpaCoinFunctions';

class TransactionDetailsView extends React.Component {
    constructor() {
        super();
        this.transactionRows = {
            from: {label: 'From', linkTo: '/address', type: 'address', hex: true},
            to: {label: 'To', linkTo: '/address', type: 'address', hex: true},
            value: {label: 'Value', type: 'coin'},
            fee: {label: 'Fee', type: 'coin'},
            dateCreated: {label: 'Date created', type: 'date'},
            data: {label: 'Data', capitalize: true},
            senderPubKey: {label: 'Sender Public key'},
            transactionDataHash: {label: 'Transaction data hash', linkTo: '/transaction', hex: true},
            minedInBlockIndex: {label: 'Mined in block index'},
            transferSuccessful: {label: 'Transfer successful', capitalize: true}
        };
        this.getTransaction = this.getTransaction.bind(this);
    }
    componentDidMount() {
        if (!this.props.data) {
            this.getTransaction();
        }
    }
    getTransaction() {
        this.transactionDataRequest = new Xhr(`transaction/${this.props.match.params.transactionDataHash.trim()}`);
        this.props.getTransactionByHash(this.transactionDataRequest);
    }

    render() {
        console.log('TransactionDetailsView')
        return (
            <main className="full-width">
                <div className="show-block-main-content-container">
                    <h2 className="block-hash">
                        Transaction # {this.props.data ? denoteHex(this.props.data.transactionDataHash.trim()) : ''}
                    </h2>
                    <DetailsBox 
                        data={this.props.data}
                        rows={this.transactionRows}
                        error={this.props.error}
                        isLoading={this.props.isLoading}
                    />
                </div> 
            </main>
        )
    }
}
export default TransactionDetailsView;