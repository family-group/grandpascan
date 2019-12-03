import React from 'react';
import ShadowBox from './ShadowBox';
import Loader from './Loader';
import Error from './Error';
import { withRouter } from 'react-router-dom';
import { renderColumnAccordingLabel } from '../utils/granpaCoinFunctions';
import './styles/DetailsBox.css';

class DetailsBox extends React.Component {
    constructor() {
        super();
        this.goHome = this.goHome.bind(this);
        this.renderColumnAccordingLabel = renderColumnAccordingLabel.bind(this);
    }
    renderRow(label, content) {
        return (
            <div key={label} className="details-box-row flex-row">
                <p className="details-box-content">{label}</p>
                <p className="details-box-content">{content}</p>
            </div>
        );
    }
    renderBlockInfo() {
        if (this.props.isLoading) {
            return <Loader />
        }
        if (this.props.data) {
            return Object.keys(this.props.rows).map(key => {
                return this.renderRow(this.props.rows[key].label, this.renderColumnAccordingLabel(this.props.rows, key));
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