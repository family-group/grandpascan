import React from 'react';
import ShadowBox from './ShadowBox';
import Xhr from '../utils/Xhr';

import './styles/MobileNodeInfo.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class MobileNodeInfo extends React.Component {
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
    renderRow(title, content, link = false) {
        return (
            <div className="flex-row full-width">
                <p className="node-info-title">{title}</p>
                <p className="node-info-content">
                {
                    link 
                    ?
                        <Link to={link}>{content}</Link>
                    :
                        content
                }
                </p>
            </div>
        );
    }
    render() {
        return (
            <React.Fragment>
                <h3 className="section-list-container-title">Node info</h3>
                <ShadowBox className="node-info-container flex-column">
                    {this.renderRow('Network peers', this.props.peerIds && this.props.peerIds.length, '/node/peers')}
                    {this.renderRow('Network blocks', this.props.nodeInfo && this.props.nodeInfo.blocksCount)}
                    {this.renderRow('Network difficulty', this.props.nodeInfo && this.props.nodeInfo.cumulativeDifficulty)}
                </ShadowBox>
            </React.Fragment>
        );
    }
}
export default MobileNodeInfo;