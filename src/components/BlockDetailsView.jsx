import React from 'react';
// importing styles
import './styles/BlockDetailsView.css';
// importing utils
import Xhr from '../utils/Xhr';
// import { dateHumanize } from '../utils/dateFunctions';
// import Loader from './Loader';
// import Error from './Error';
import DetailsBox from './DetailsBox';

class BlockDetailsView extends React.Component {
    constructor() {
        super();
        this.blockLabels = {
            index: 'Index',
            difficulty: 'Difficulty',
            prevBlockHash: 'Previous Block Hash',
            minedBy: 'Mined by',
            blockDataHash: 'Block data hash',
            dateCreated: 'Date created',
            nonce: 'Nonce',
            blockHash: 'Block Hash',
            transactions: 'Transactions included'
        };
        this.getBlock = this.getBlock.bind(this);
    }
    componentDidMount() {
        if (!this.props.data) {
            this.getBlock();
        }
    }
    getBlock() {
        this.blockDataRequest = new Xhr(`block/${this.props.match.params.blockHash}`);
        this.props.getBlockByHash(this.blockDataRequest);
    }
    render() {
        console.log('BlockDetailsView' )
        return (
            <main className="full-width">
                <div className="show-block-main-content-container">
                    <h2 className="block-hash">
                        Block # {this.props.data ? this.props.data.blockHash : ''}
                    </h2>
                    <DetailsBox 
                        data={this.props.data}
                        labels={this.blockLabels}
                        error={this.props.error}
                        isLoading={this.props.isLoading}
                    />
                </div>       
            </main>
        )
    }
}
export default BlockDetailsView;