import React from 'react';

class Error extends React.Component {
    render() {
        const { className, errorMessage, retryFunction, errorMessageClassName, tag } = this.props;
        const Tag = tag || 'div';
        const ChildTag = tag === 'tr' ? 'td' : 'div';
        return (
            <Tag className="flex-column flex-axis-centered"
            {...Object.assign({}, className ? {className: `flex-column flex-axis-centered full-width ${className}`} : {className: 'flex-column flex-axis-centered full-width'})}
            >
                <ChildTag
                    {...Object.assign({}, errorMessageClassName ? {className: errorMessageClassName } : {})}
                >
                    <p>{errorMessage}</p>
                    <p><button className="btn" onClick={retryFunction}>Retry</button></p>
                </ChildTag>
            </Tag>
        );
    }
}
export default Error;