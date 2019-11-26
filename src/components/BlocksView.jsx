import React from 'react';
// importing styles
import './styles/TransactionsView.css';
// importing utils
import Xhr from '../utils/Xhr';
// importing components
import TableData from './TableData';
// importing columns data
import { blocksViewData } from '../components-data/blocksViewData';

class BlocksView extends React.Component {
    constructor() {
        super();
        this.getBlocksViewContainerRef = this.getBlocksViewContainerRef.bind(this);
        this.getBlocksViewContainerWidth = this.getBlocksViewContainerWidth.bind(this);
        this.getAllBlocks = this.getAllBlocks.bind(this);
    }
    componentDidMount() {
        this.getAllBlocks();
    }
    componentWillUnmount() {
        if(this.blocksRequest) this.blocksRequest.abort();
    }
    getAllBlocks() {
        this.blocksRequest = new Xhr('blocks');
        this.props.getBlocks(this.blocksRequest);
    }
    getBlocksViewContainerRef(el) {
        if (el) this.TransactionsViewContainerRef = el;
    }
    getBlocksViewContainerWidth() {
        if (this.TransactionsViewContainerRef) {
            return parseInt(getComputedStyle(this.TransactionsViewContainerRef).width);
        }
    }
    render() {
        console.log('BlocksView')
        const { ids, isLoading, error } = this.props;
        return (
            <main className="full-width">
                <div ref={this.getBlocksViewContainerRef} className="transactions-view-container">
                    <h2 className="">Blocks</h2>
                    {
                        ids &&
                            (<p>{ids.length} Blocks found.</p>)
                    }
                    <TableData
                        data={ids}
                        columns={blocksViewData}
                        className={isLoading || error ? 'transactions-list-container flex-axis-centered spacer-lg' : 'transactions-list-container flex-column'}
                        tableContainerWidth={this.getBlocksViewContainerWidth}
                        isLoading={isLoading}
                        error={error}
                        retryFunction={this.getAllBlocks}
                    >
                        
                    </TableData>
                </div>
            </main>
        );
    }
}
export default BlocksView;