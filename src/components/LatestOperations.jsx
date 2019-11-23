import React from 'react';
// importing components
import ListBox from './ListBox';
import LatestSingleOperationContainer from '../containers/LatestSingleOperationContainer';
// importing utils
import Xhr from '../utils/Xhr';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// importing styles
import './styles/LatestOperations.css';

class LatestOperations extends React.Component {
    constructor() {
        super();
        this.getLatestOperations = this.getLatestOperations.bind(this);
    }
    componentDidMount() {
        this.getLatestOperations();
    }
    getLatestOperations() {
        const endPoint = this.props.type === 'BLOCK' ? 'blocks?latest=true' : 'transactions/confirmed?latest=true';
        this.operationRequest = new Xhr(endPoint);

        this.props[this.props.type === 'BLOCK' ? 'getBlocks' : 'getTransactions'](this.operationRequest);
    }
    componentWillUnmount() {
        if (this.operationRequest) this.operationRequest.abort();
    }
    render() {
        const { ids, isLoading, isEmpty, type, title, linkTo, linkToText } = this.props;
        console.log('Rendering LatestBlocks')
        return (
            <section className="section-list-container">
                <h3 className="section-list-container-title">{title}</h3>
                {
                    linkToText && 
                        (
                            <p className="link-to-text">
                                <Link to={linkTo}>
                                    {linkToText}
                                </Link>
                            </p>
                        )
                }
                <ListBox
                    data={ids.slice(0, 3).reverse()}
                    className={isLoading ? 'lasted-operations-list flex-axis-centered' : 'lasted-operations-list'}
                    isLoading={isLoading}
                    isEmpty={isEmpty}
                    error={this.props.error}
                    errorFunction={this.getLatestOperations}
                >
                    <LatestSingleOperationContainer 
                        type={type}
                    />
                </ListBox>
            </section>
        )
    }
}
export default LatestOperations;