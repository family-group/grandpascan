import React from 'react';
import './styles/TableDataRow.css';
import TableDataRowContainer from '../containers/TableDataRowContainer';
import Loader from './Loader';
import Error from './Error';
import ShadowBox from './ShadowBox';

class TableData extends React.Component {
    constructor(props) {
        super(props);
        this.mediaQueries = {
            '(max-width: 5000px) and (min-width: 1599px)': 8,
            '(max-width: 1600px) and (min-width: 1280px)': 7,
            '(max-width: 1279px) and (min-width: 900px)': 5,
            '(max-width: 899px) and (min-width: 700px)': 4,
            '(max-width: 699px) and (min-width: 480px)': 3,
            '(max-width: 479px) and (min-width: 200px)': 2,
        };
        this.setMediaQueries = this.setMediaQueries.bind(this);
        this.changeColumnsToRender = this.changeColumnsToRender.bind(this);
        this.state = {
            columnsToRender: 8
        };
        this.addedListeners = [];
    }
    componentDidMount() {
        this.setMediaQueries();
        if (this.props.tableContainerWidth()) {
            document.documentElement.style.setProperty('--columns-width', (this.props.tableContainerWidth() / 8) + 'px');
        }
    }
    componentWillUnmount() {
        this.removeMediaQueries();
    }
    setMediaQueries() {
        Object.keys(this.mediaQueries).forEach(query => {
            const media = window.matchMedia(query);
            this.addedListeners.push(media);
            media.addListener(this.changeColumnsToRender);
            this.changeColumnsToRender(media);
        });
    }
    removeMediaQueries() {
        this.addedListeners.forEach(media => media.removeListener(this.changeColumnsToRender));
    }
    changeColumnsToRender(query) {
        if (query.matches) {
            this.setState({
                columnsToRender: this.mediaQueries[query.media]
            });
        }
    }
    renderTableHead() {
        if (this.props.columns) {
            return Object.keys(this.props.columns).slice(0, this.state.columnsToRender).map(key => {
                return (
                    <th key={key} className="table-th">{this.props.columns[key].label}</th>
                );
            });
        }
    }
    renderColumns() {
        if (this.props.data) {
            return this.props.data.map((singleData, index) => {
                return (
                    <TableDataRowContainer 
                        key={singleData}
                        id={singleData}
                        index={index}
                        columns={this.props.columns}
                        columnsToRender={this.state.columnsToRender}
                    />
                );
            });
        }
    }
    renderTableContent() {
        if (this.props.isLoading)
            return <Loader tag="tr" />;
        if (this.props.isEmpty) {
            return (
                <Error 
                    errorMessage={this.props.errorMessage || 'There are no transactions yet.'}
                    className="error-padding-large"
                    errorMessageClassName="spacer-lg"
                    tag="tr"
                    buttonMessage={this.props.buttonMessage}
                    retryFunction={this.props.retryFunction}
                />
            );
        }
        if (this.props.error) {
            return (
                <Error 
                    errorMessage={this.props.error.message}
                    className="error-padding-large"
                    errorMessageClassName="spacer-lg"
                    tag="tr"
                    retryFunction={this.props.retryFunction}
                />
            );
        }
        return (
            <React.Fragment>
                <tr className="transaction-row">
                    {this.renderTableHead()}
                </tr>
                {this.renderColumns()}
            </React.Fragment>
        );
    }
    render() {
        console.log('Rendering TABLE DATA')
        return (
            <ShadowBox 
                tag="table"
                {...Object.assign({}, this.props.className ? {className: 'table-data ' + this.props.className} : {className: 'table-data'})}
            >
                <tbody>
                    {this.renderTableContent()}
                </tbody>
            </ShadowBox>
        );
    }
}
export default TableData;