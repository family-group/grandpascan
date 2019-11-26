import React from 'react';
// importing components
import LatestOperationsContainer from '../containers/LatestOperationsContainer';
// importing styles
import './styles/HomeView.css';
import AsideContainer from '../containers/HomeViewSideElementContainer';


class HomeView extends React.Component {
    render() {
        return (
            <main className="home-main flex-row">
                <AsideContainer />
                <div className="main-content">
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