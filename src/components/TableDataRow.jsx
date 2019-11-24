import React from 'react';
// importing styles
import './styles/TableDataRow.css';
import { renderColumnAccordingLabel } from '../utils/granpaCoinFunctions';

class TableDataRow extends React.Component {
    constructor() {
        super();
        this.renderColumnAccordingLabel = renderColumnAccordingLabel.bind(this);
    }
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