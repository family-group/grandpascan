import React from 'react';
// importing styles
import './styles/Header.css';
//importing images
import logo from '../assets/images/GRANDPACOIN ICONO.svg';
// importing components
import SearchInput from './SearchInput';
// importing utils

class Header extends React.Component {
    render() {
        return (
            <header className="main-header">
                <div className="main-header-content-container">
                    <div className="logo-container">
                        <h1>
                            <img src={logo} alt="Grandpa coin Logo" />
                            <span className="title-container">
                                <span className="coin-name">GrandpaCoin </span>
                                <span className="miner-title">Scan</span>
                            </span>
                        </h1>
                    </div>
                    <div className="search-bar-container">
                        <SearchInput />
                    </div>
                </div>
            </header>
        );
    }
}
export default Header;