import React from 'react';
// importing styles 
import './styles/HomeViewSideElement.css';
// importing components
import SideBox from '../components/SideBox';
import latestBlockIcon from '../assets/images/CUBO.svg';
import networkIcon from '../assets/images/network.svg';
import difficultyIcon from '../assets/images/DIFFICULTY.svg';
// import { toGrandpaCoin } from '../utils/granpaCoinFunctions';
import Xhr from '../utils/Xhr';

class HomeViewSideElement extends React.Component {
    constructor() {
        super();
        this.getAllPeers = this.getAllPeers.bind(this);
        this.getMainNodeInfo = this.getMainNodeInfo.bind(this);
    }
    componentDidMount() {
        this.getAllPeers();
        this.getMainNodeInfo();
    }
    getAllPeers() {
        const peersRequest = new Xhr('peers');
        this.props.getPeers(peersRequest);
    }
    getMainNodeInfo() {
        const nodeInfoRequest = new Xhr('info');
        this.props.getNodeInfo(nodeInfoRequest);
    }
    render() {
        console.log('HomeViewSideElement')
        return (
            <aside className="main-aside">
                <SideBox
                    isLoading={this.props.isPeerLoading}
                    error={this.props.peersError}
                    retryFunction={this.getAllPeers}
                    content={[
                        {
                            title: 'Network peers',
                            content: this.props.peerIds && this.props.peerIds.length,
                            linkTo: '/node/peers'
                        }
                    ]}
                    image={networkIcon}
                />
                <SideBox 
                    image={latestBlockIcon}
                    isLoading={this.props.isNodeInfoLoading}
                    error={this.props.nodeInfoError}
                    retryFunction={this.getMainNodeInfo}
                    content={[
                        {
                            title: 'Network blocks',
                            content: this.props.nodeInfo && this.props.nodeInfo.blocksCount
                        }
                    ]}
                />
                <SideBox
                    isLoading={this.props.isNodeInfoLoading}
                    error={this.props.nodeInfoError}
                    retryFunction={this.getMainNodeInfo}
                    image={difficultyIcon}
                    content={[
                        {
                            title: 'Network difficulty',
                            content: this.props.nodeInfo && this.props.nodeInfo.cumulativeDifficulty
                        }
                    ]}
                />
            </aside>
        );
    }
}
export default HomeViewSideElement;