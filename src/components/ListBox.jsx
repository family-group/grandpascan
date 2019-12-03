import React from 'react';
import './styles/ListBox.css';
import Loader from './Loader';
import Error from './Error';

class ListBox extends React.Component {
    constructor() {
        super();
        this.renderListItems = this.renderListItems.bind(this);
    }

    renderListItems() {
        const { children: ChildrenComponent }  = this.props;
        React.Children.only(this.props.children); 

        if (this.props.isLoading) {
            return <Loader />
        }
        if (this.props.isEmpty) {
            return (
                <p>There are no blocks yet.</p>
            )
        }
        if (this.props.error) {
            return (
                <Error 
                    errorMessage={this.props.error.message}
                    className="error-padding-large"
                    errorMessageClassName="spacer flex-column text-center"
                    retryFunction={this.props.errorFunction}
                />
            );
        }
        if (typeof ChildrenComponent.type === 'string')
            return console.error(new Error('Uncaught Invariant Violation: expected to receive a single React Component as a child.'));
        if (this.props.data) {
            return this.props.data.map((itemData, index) => {
                return (
                    <ChildrenComponent.type
                        key={itemData}
                        id={itemData}
                        index={index}
                        {...this.props.children.props}
                    />
                );
            });
        }
    }
    render() {
        console.log('Rendering ListBox')
        const Tag = this.props.tag || 'article';
        return (
            <Tag 
                {...Object.assign({}, this.props.className ? {className: 'list-container ' + this.props.className} : {className: 'list-container'})}
            >
                {this.renderListItems()}
            </Tag>
        );
    }
}
export default ListBox;