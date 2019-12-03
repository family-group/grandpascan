import React from 'react';
// importing styles
import './styles/ShadowBox.css';

class ShadowBox extends React.Component {
    render() {
        const CustomTag = this.props.tag || 'div';
        const { className } = this.props;
        return (
            <CustomTag
                {...Object.assign({}, className ? {className: 'shadow-box ' + className} : {className: 'shadow-box'})}
            >
                {this.props.children}
            </CustomTag>
        );
    }
}
export default ShadowBox;