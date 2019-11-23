import React from 'react';
// importing styles 
import './styles/Aside.css';
// importing components
import SideBoxContainer from '../containers/SideBoxContainer';
import latestBlockIcon from '../assets/images/CUBO.svg';
import latestTransactionIcon from '../assets/images/TRANSACTION.svg';
import difficultyIcon from '../assets/images/DIFFICULTY.svg';

class Aside extends React.Component {
    render() {
        return (
            <aside className="main-aside">
                <SideBoxContainer 
                    title="Latest Block"
                    titleContent="index"
                    subtitle="Transactions"
                    image={latestBlockIcon}
                    type='BLOCK'
                    id={this.props.blockId}
                />
                <SideBoxContainer 
                    title="Latest Transaction"
                    titleContent="value"
                    image={latestTransactionIcon}
                    type='TRANSACTION'
                    id={this.props.transactionId}
                    parse={true}
                />
                <SideBoxContainer 
                    title="Difficulty"
                    titleContent="difficulty"
                    image={difficultyIcon}
                    type='BLOCK'
                    id={this.props.blockId}
                />
            </aside>
        );
    }
}
export default Aside;