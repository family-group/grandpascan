import React from 'react';
import { Link } from 'react-router-dom';
// importing styles
import './styles/LatestSingleOperation.css';
// importing utils
import { dateHumanize } from '../utils/dateFunctions';
import { toGrandpaCoin } from '../utils/granpaCoinFunctions';

class LatestSingleOperation extends React.Component {
    renderSecondColumn() {
        const { data } = this.props;
        if (this.props.type === 'TRANSACTION') {
            return (
                <React.Fragment>
                    <p className="block-column-content">
                        <Link to={`address/${data.from}/transactions`}>
                            From: {data.from}
                        </Link>
                    </p>
                    <p className="block-column-content">
                        <Link to={`address/${data.to}/transactions`}>
                            To: {data.to}
                        </Link>
                    </p>
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                <p className="block-column-content">
                    <Link to={`/block/${data.blockHash}`}>
                        {data.blockHash}
                    </Link>
                </p>
                {/* <p className="block-column-content">Difficulty {data.difficulty}</p> */}
            </React.Fragment>
        )
    }
    renderLastColumn() {
        const { data } = this.props;
        if (this.props.type === 'TRANSACTION') {
            return <p className="block-column-content">{toGrandpaCoin(data.value)}</p>;
        }
        return (
            <React.Fragment>
                <p className="block-column-content">{data.transactions.length}</p>
                <p className="block-column-content">Txs included</p>
            </React.Fragment>
        )
    }
    getIndexOrTransactionHash() {
        if (this.props.type === 'TRANSACTION') {
            return (
                <p className="block-index">
                    <Link to={`/transaction/${this.props.data.transactionDataHash}`}>
                        {this.props.data.transactionDataHash}
                    </Link>
                </p>
            );
        }
        return <p className="block-index">{this.props.data.index}</p>;
    }
    render() {
        console.log('LatestSingleOperation')
        const { data, type } = this.props;
        return (
            <article className="single-block-container">
                <div className="block-column">
                    <div className="block-box-identifier">{type === 'BLOCK' ? 'B' : 'T'}</div>
                    <div className="flex-column index-container">
                        {this.getIndexOrTransactionHash()}
                        <p className="block-mined-date">{dateHumanize(data.dateCreated)}</p>
                    </div>
                </div>
                <div className="block-column">
                        {this.renderSecondColumn()}
                </div>
                <div className="block-column">
                    <div className="flex-column">
                        {this.renderLastColumn()}
                    </div>
                </div>
            </article>
        )
    }
}
export default LatestSingleOperation;