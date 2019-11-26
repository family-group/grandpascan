import React from 'react';
// importing styles 
import './styles/HomeViewSideElement.css';
// importing components
import SideBox from '../components/SideBox';
import latestBlockIcon from '../assets/images/CUBO.svg';
import latestTransactionIcon from '../assets/images/TRANSACTION.svg';
import difficultyIcon from '../assets/images/DIFFICULTY.svg';
import { toGrandpaCoin } from '../utils/granpaCoinFunctions';

class HomeViewSideElement extends React.Component {
    render() {
        console.log('HomeViewSideElement')
        return (
            <aside className="main-aside">
                <SideBox
                    content={[
                        {
                            title: 'Latest block miner',
                            content: this.props.blockData && this.props.blockData.minedBy,
                            type: 'address',
                            linkTo: '/address'
                        }
                    ]}
                    image={latestBlockIcon}
                />
                <SideBox 
                    image={latestTransactionIcon}
                    content={[
                        {
                            title: 'Latest transaction value',
                            content: this.props.transactionData && toGrandpaCoin(this.props.transactionData.value)
                        }
                    ]}
                />
                <SideBox
                    image={difficultyIcon}
                    content={[
                        {
                            title: 'Latest block difficulty',
                            content: this.props.blockData && this.props.blockData.difficulty
                        }
                    ]}
                />
            </aside>
        );
    }
}
export default HomeViewSideElement;