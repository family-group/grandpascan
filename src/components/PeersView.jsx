import React from 'react';
// importing styles
import './styles/TransactionsView.css';
// importing utils
import Xhr from '../utils/Xhr';
// importing components
import TableData from './TableData';
// importing columns
import { peersViewData } from '../components-data/peersViewData';

class PeersView extends React.Component {
    constructor() {
        super();
        this.peersViewContainerRef = this.peersViewContainerRef.bind(this);
        this.getPeersViewContainerWidth = this.getPeersViewContainerWidth.bind(this);
        this.getAllPeers = this.getAllPeers.bind(this);
    }
    componentDidMount() {
        this.getAllPeers();
    }
    componentWillUnmount() {
        if(this.peerRequest) this.peerRequest.abort();
    }
    getAllPeers() {
        this.peerRequest = new Xhr('peers');
        this.props.getPeers(this.peerRequest);
    }
    peersViewContainerRef(el) {
        if (el) this.TransactionsViewContainerRef = el;
    }
    getPeersViewContainerWidth() {
        if (this.TransactionsViewContainerRef) {
            return parseInt(getComputedStyle(this.TransactionsViewContainerRef).width);
        }
    }
    render() {
        console.log('PeersView')
        const { ids, isLoading, error, isEmpty } = this.props;
        return (
            <main className="full-width">
                <div ref={this.peersViewContainerRef} className="transactions-view-container">
                    <h2 className="">Peers</h2>
                    {
                        ids &&
                            (<p>{ids.length} Peers found.</p>)
                    }
                    <TableData
                        errorMessage={this.props.isEmpty ? 'No peers connected at this moment.' : this.props.error}
                        data={ids}
                        columns={peersViewData}
                        className={isLoading || error ? 'transactions-list-container flex-axis-centered spacer-lg' : 'transactions-list-container flex-column'}
                        tableContainerWidth={this.getPeersViewContainerWidth}
                        isLoading={isLoading}
                        error={error}
                        isEmpty={isEmpty}
                        retryFunction={this.getAllPeers}
                    >
                        
                    </TableData>
                </div>
            </main>
        );
    }
}
export default PeersView;