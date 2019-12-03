import React from 'react';
// importing styles
import './styles/SearchInput.css';
import searchIcon from '../assets/images/LUPA.svg'
import { withRouter } from 'react-router-dom';

class SearchInput extends React.Component {
    constructor() {
        super();
        this.setInitialInput = this.setInitialInput.bind(this);
        this.search = this.search.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.setFocus = this.setFocus.bind(this);
        this.setBlur = this.setBlur.bind(this);
    }
    componentDidMount() {
        document.addEventListener('keydown', this.onKeyPress);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyPress);
    }
    setInitialInput(target) {
        this.setTarget(target);
    }
    setTarget(target) {
        if (target) {
            this.target = target;
        }
    }
    search() {
        if (this.getInputValue() === '') return;

        if (this.isBlockHash()) {
            this.goTo(`/block/${this.getInputValue()}`)
            return;
        }
        if (this.isTransactionHash()) {
            this.goTo(`/transaction/${this.getInputValue()}`);
            return;
        }
        if (this.isAddress()) {
            this.goTo(`/address/${this.getInputValue()}/transactions`);
            return;
        }
        this.goTo(`/not-found/${this.getInputValue()}`);
    }
    goTo(endpoint) {
        this.props.history.push(endpoint);
        this.target.value = '';
    }
    isTransactionHash() {
        return /^0x/.test(this.getInputValue()) && this.getInputValue().length === 66;
    }
    isBlockHash() {
        return !/^0x/.test(this.getInputValue()) && this.getInputValue().length === 64;
    }
    isAddress() {
        return this.getInputValue().replace(/^0x/, '').length === 40;
    }
    getInputValue() {
        return this.target.value.trim();
    }
    onKeyPress(e) {
        if (e.keyCode === 13 && this.isOnFocus) {
            this.search();
        }
    }
    setFocus() {
        this.isOnFocus = true;
    }
    setBlur() {
        this.isOnFocus = false;
    }
    render() {
        return (
            <fieldset className="input-container">
                <div className="full-width input-wrapper">
                    <img 
                        onClick={this.search} 
                        src={searchIcon} 
                        alt="search-icon"
                    />
                    <input ref={this.setInitialInput}
                        type="text" 
                        onFocus={this.setFocus}
                        onBlur={this.setBlur}
                    />
                </div>
            </fieldset>
        );
    }
}
export default withRouter(SearchInput);
