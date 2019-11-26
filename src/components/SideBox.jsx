import React from 'react';
// importing styles
import './styles/SideBox.css';
// importing utils
import { toGrandpaCoin } from '../utils/granpaCoinFunctions';
import Link from './Link';

class SideBox extends React.Component {
    renderFirstRowInfo() {
        const { data, titleContent, parse } = this.props;
        if (data) {
            return (
                <p className="box-content">{parse ? toGrandpaCoin(data[titleContent]) : data[titleContent]}</p>
            );
        }
    }
    renderSecondRowInfo() {
        const { data, type, subtitle, parse } = this.props;
        if (data && type === 'BLOCK' && subtitle) {
            return (
                <div className="subtitle-box-container">
                    <h4 className="sidebox-title">{subtitle}</h4>
                    <p className="box-content ">{ parse ? toGrandpaCoin(data.transactions.length) : data.transactions.length}</p>
                </div>
            );
        }
    }
    renderData() {
        const { content } = this.props;
        if (content) {
            return content.map(singleData => {
                return (
                    <div key={singleData.title} className="latest-box-info flex-column">
                        <h4 className="sidebox-title">{singleData.title}</h4>
                        {this.renderFormatedData(singleData)}
                    </div>
                );
            });
        }
    }
    renderFormatedData(singleData) {
        if (singleData.linkTo) {
            return (
                <Link to={singleData.linkTo + '/' + singleData.content + `${singleData.type === 'address' ? '/transactions' : ''}`}>
                    {singleData.content}
                </Link>
            );
        }
        return <p className="box-content ellipsis">{singleData.content}</p>;
    }
    render() {
        return (
            <div className="side-box-container">
                <div className="content-container flex-row">
                    {
                        this.props.image && 
                            (
                                <div className="image-container">
                                    <img src={this.props.image} alt="Latest block icon." />
                                </div>
                            )
                    }
                    <div className="flex-column flex no-overflow">
                        {this.renderData()}
                    </div>
                    {/* <div className="latest-box-info flex-column">
                        <h4 className="sidebox-title">{this.props.title}</h4>
                        {this.renderFirstRowInfo()}
                        {this.renderSecondRowInfo()}
                    </div> */}
                </div>
            </div>
        );
    }
}
export default SideBox;