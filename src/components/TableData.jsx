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
            columns: 8
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
                columns: this.mediaQueries[query.media]
            });
        }
    }
    renderTableHead() {
        if (this.props.labels) {
            return Object.keys(this.props.labels).slice(0, this.state.columns).map(label => {
                return (
                    <th key={label} className="table-th">{this.props.labels[label].label}</th>
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
                        labels={this.props.labels}
                        columnsToRender={this.state.columns}
                    />
                );
            });
        }
    }
    renderTableContent() {
        if (this.props.isLoading)
            return <Loader tag="tr" />;
        if (this.props.error) {
            return (
                <Error 
                    errorMessage={this.props.error.message}
                    className="error-padding-large"
                    errorMessageClassName="spacer"
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
        console.log('Rendering ListBox')
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