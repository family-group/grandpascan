import React from 'react';
import { Link } from 'react-router-dom';
// importing styles
import './styles/LatestSingleOperation.css';
// importing utils
import { dateHumanize } from '../utils/dateFunctions';
import { toGrandpaCoin, denoteHex } from '../utils/granpaCoinFunctions';

class LatestSingleOperation extends React.Component {
    constructor() {
        super();
        this.mediaQuery = window.matchMedia('(max-width: 620px) and (min-width: 100px)');
        this.setMatchMedia = this.setMatchMedia.bind(this);
        this.renderColumnsAccordingWindowSize = this.renderColumnsAccordingWindowSize.bind(this);
        this.state = {
            shouldRenderLastColumn: false
        };
    }
    componentDidMount() {
        this.setMatchMedia();
    }
    setMatchMedia() {
        this.mediaQuery.addListener(this.renderColumnsAccordingWindowSize);
        this.renderColumnsAccordingWindowSize(this.mediaQuery)
    }
    componentWillUnmount() {
        this.mediaQuery.removeListener(this.renderColumnsAccordingWindowSize);
    }
    renderColumnsAccordingWindowSize(query) {
        if (query.matches) {
            if (this.state.shouldRenderLastColumn) {
                this.setState({
                    shouldRenderLastColumn: false
                });
            }
            
        } else {
            if (!this.state.shouldRenderLastColumn) {
                this.setState({
                    shouldRenderLastColumn: true
                });
            }
        }
    }
    renderSecondColumn() {
        const { data } = this.props;
        if (this.props.type === 'TRANSACTION') {
            return (
                <React.Fragment>
                    <p className="block-column-content">
                        <Link to={`address/${denoteHex(data.from)}/transactions`}>
                            From: {denoteHex(data.from)}
                        </Link>
                    </p>
                    <p className="block-column-content">
                        <Link to={`address/${denoteHex(data.to)}/transactions`}>
                            To: {denoteHex(data.to)}
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
                    <Link to={`/transaction/${denoteHex(this.props.data.transactionDataHash)}`}>
                        {denoteHex(this.props.data.transactionDataHash)}
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
                {
                    this.state.shouldRenderLastColumn && 
                        (
                            <div className="block-column">
                                <div className="flex-column">
                                    {this.renderLastColumn()}
                                </div>
                            </div>
                        )
                }
            </article>
        )
    }
}
export default LatestSingleOperation;