import React from 'react';
import './styles/Loader.css';

const Loader = (props) => {
    const Tag = props.tag || 'div';
    const ChildTag = props.tag && props.tag === 'tr' ? 'td' : 'div';
    return (
        <Tag className="lds-ripple"><ChildTag></ChildTag><ChildTag></ChildTag></Tag>
    );
}

export default Loader;