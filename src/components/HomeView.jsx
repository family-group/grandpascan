import React from 'react';
// importing components
import LatestOperationsContainer from '../containers/LatestOperationsContainer';
// importing styles
import './styles/HomeView.css';
import HomeViewSideElementContainer from '../containers/HomeViewSideElementContainer';
import MobileNodeInfoContainer from '../containers/MobileNodeInfoContainer';


class HomeView extends React.Component {
    constructor() {
        super();
        this.state = {
            shouldRenderSideBox: false
        };
        this.mediaQuery = window.matchMedia('(max-width: 967px) and (min-width: 100px)');
        this.setMatchMedia = this.setMatchMedia.bind(this);
        this.renderSideBox = this.renderSideBox.bind(this);
    }
    componentDidMount() {
        this.setMatchMedia();
    }
    setMatchMedia() {
        this.mediaQuery.addListener(this.renderSideBox);
        this.renderSideBox(this.mediaQuery)
    }
    componentWillUnmount() {
        this.mediaQuery.removeListener(this.renderSideBox);
    }
    renderSideBox(query) {
        if (query.matches) {
            if (this.state.shouldRenderSideBox) {
                this.setState({
                    shouldRenderSideBox: false
                });
            }
            
        } else {
            if (!this.state.shouldRenderSideBox) {
                this.setState({
                    shouldRenderSideBox: true
                });
            }
        }
    }
    render() {
        console.log('rendering')
        return (
            <main className="home-main flex-row">
                {this.state.shouldRenderSideBox && <HomeViewSideElementContainer />}
                <div className="main-content">
                    {!this.state.shouldRenderSideBox && <MobileNodeInfoContainer />}
                    <LatestOperationsContainer
                        type="BLOCK" 
                        title="Latest Blocks"
                        linkToText="View all"
                        linkTo="blocks"
                     />
                    <LatestOperationsContainer
                        type="TRANSACTION" 
                        title="Latest Transactions"
                        linkToText="View all"
                        linkTo="transactions"
                     />
                </div>
                
            </main>
        );
    }
}
export default HomeView;