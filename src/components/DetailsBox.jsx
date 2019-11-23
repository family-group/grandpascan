import React from 'react';
import ShadowBox from './ShadowBox';
import { dateHumanize } from '../utils/dateFunctions';
import Loader from './Loader';
import Error from './Error';
import { withRouter } from 'react-router-dom';

class DetailsBox extends React.Component {
    constructor() {
        super();
        this.goHome = this.goHome.bind(this);
    }
    renderRow(label, content) {
        return (
            <div key={label} className="block-info-row flex-row">
                <p>{label}</p>
                <p>{content}</p>
            </div>
        );
    }
    formatInfo(label) {
        if (label === 'transactions') {
            return this.props.data[label].length;
        }
        if (label === 'dateCreated') {
            return dateHumanize(this.props.data[label]) + ` (${this.props.data[label]})`;
        }
        if (label === 'transferSuccessful') {
            return 'True';
        }
        return this.props.data[label];
    }
    renderBlockInfo() {
        if (this.props.isLoading) {
            return <Loader />
        }
        if (this.props.data) {
            return Object.keys(this.props.labels).map(label => {
                return this.renderRow(this.props.labels[label], this.formatInfo(label));
            });
        }
        if (this.props.error) {
            return (
                <Error 
                    errorMessage={this.props.error.message}
                    retryFunction={this.goHome}
                    className="error-padding-large"
                    errorMessageClassName="spacer-lg"
                />
            );
        }
    }
    goHome() {
        this.props.history.push('/');
    }
    render() {
        console.log('TransactionView')
        return (
            <ShadowBox tag="section" className={this.props.isLoading || this.props.error ? 'block-info-container flex-column flex-axis-centered' : 'block-info-container flex-column'}>
                {this.renderBlockInfo()}
            </ShadowBox>
    );
    }
}
export default withRouter(DetailsBox);