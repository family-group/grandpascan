import React from 'react';
// importing styles
import './styles/BlockDetailsView.css';
// importing utils
import Xhr from '../utils/Xhr';
import DetailsBox from './DetailsBox';

class BlockDetailsView extends React.Component {
    constructor() {
        super();
        this.blockRows = {
            index: {label: 'Index'},
            difficulty: {label: 'Difficulty'},
            prevBlockHash: {label: 'Previous Block Hash', linkTo: '/block'},
            minedBy: {label: 'Mined by', linkTo: '/address', type: 'address', hex: true},
            blockDataHash: {label: 'Block data hash'},
            dateCreated: {label: 'Date created', type: 'date'},
            nonce: {label: 'Nonce'},
            blockHash: {label: 'Block Hash', linkTo: '/block'},
            transactions: {label: 'Transactions included'}
        };
        this.getBlock = this.getBlock.bind(this);
    }
    componentDidMount() {
        if (!this.props.data) {
            this.getBlock();
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.blockHash !== this.props.match.params.blockHash) {
            this.getBlock();
        }
    }
    getBlock() {
        this.blockDataRequest = new Xhr(`block/${this.props.match.params.blockHash.trim()}`);
        this.props.getBlockByHash(this.blockDataRequest);
    }
    render() {
        console.log('BlockDetailsView' )
        return (
            <main className="full-width">
                <div className="show-block-main-content-container">
                    <h2 className="block-hash">
                        Block # {this.props.data ? this.props.data.blockHash.trim() : ''}
                    </h2>
                    <DetailsBox 
                        data={this.props.data}
                        rows={this.blockRows}
                        error={this.props.error}
                        isLoading={this.props.isLoading}
                    />
                </div>       
            </main>
        )
    }
}
export default BlockDetailsView;