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
            from: 'From',
            to: 'To',
            value: 'Value',
            fee: 'Fee',
            dateCreated: 'Date created',
            data: 'Data',
            senderPubKey: 'Sender Public key',
            transactionDataHash: 'Transaction data hash',
            minedInBlockIndex: 'Mined in block index',
            transferSuccessful: 'Transfer successful'
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