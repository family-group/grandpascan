import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';

class Link extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        if (this.props.to && this.props.location.pathname === this.props.to) {
            e.preventDefault();
        }
    }
    render() {
        const { to } = this.props;
        return (
            <RouterLink onClick={this.handleClick} {...Object.assign({}, to ? {to} : {})} >
                {this.props.children}
            </RouterLink>  
        );
    }
}
export default withRouter(Link);