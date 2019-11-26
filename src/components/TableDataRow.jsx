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
        const { columns, columnsToRender } = this.props;
        if (columns) {
            return Object.keys(columns).slice(0, columnsToRender).map(key => {
                return (
                    <td key={key} className="transaction-td">
                        {this.renderColumnAccordingLabel(columns, key)}
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