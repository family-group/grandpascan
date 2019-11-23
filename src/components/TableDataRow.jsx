import React from 'react';
// importing styles
import './styles/TableDataRow.css';
import { toGrandpaCoin } from '../utils/granpaCoinFunctions';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { dateHumanize } from '../utils/dateFunctions';

class TableDataRow extends React.Component {
    renderColumns() {
        const { labels, columnsToRender } = this.props;
        if (labels) {
            return Object.keys(labels).slice(0, columnsToRender).map(label => {
                return (
                    <td key={label} className="transaction-td">
                        {this.renderColumnAccordingLabel(label)}
                    </td>
                );
            });
        }
    }
    renderColumnAccordingLabel(label) {
        if (label.toLowerCase() === 'value')
            return toGrandpaCoin(this.props.data[label]);
        if (label.toLowerCase() === 'datecreated')
            return dateHumanize(this.props.data[label])
        if (label.toLowerCase() === ('blockdatahash') || label.toLowerCase() === 'from' || label.toLowerCase() === 'to' || label.toLowerCase() === 'blockhash' || label.toLowerCase() === 'transactiondatahash') {
            return <Link to={this.getLinkTo(label) + `/${this.props.data[label]}`}>{this.props.data[label]}</Link>
        }
        return this.props.data[label];
    }
    getLinkTo(label) {
        if (label.toLowerCase() === ('blockhash')) 
            return 'block';
        if (label.toLowerCase() === ('transactiondatahash')) 
            return 'transaction';
        if (label.toLowerCase() === 'from' || label.toLowerCase() === 'to') 
            return 'address';
    }
    render() {
        console.log('TableDataRow') 
        return (
            <tr className="transaction-row">
                {this.renderColumns()}
            </tr>
        );
    }
}
export default TableDataRow;