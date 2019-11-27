import React from 'react';
// importing styles
import './styles/SideBox.css';
// importing utils
import { toGrandpaCoin } from '../utils/granpaCoinFunctions';
import Link from './Link';
import Loader from './Loader';
import Error from './Error';

class SideBox extends React.Component {
    shouldComponentUpdate(prevProps) {
        if (prevProps.isLoading !== this.props.isLoading) 
            return true;
        // if (prevProps.content !== this.props.content)
        //     return true;
        return false;
    }
    renderFirstRowInfo() {
        const { data, titleContent, parse } = this.props;
        if (data) {
            return (
                <p className="box-content">{parse ? toGrandpaCoin(data[titleContent]) : data[titleContent]}</p>
            );
        }
    }
    renderData() {
        const { content, isLoading, error, retryFunction } = this.props;
        if (isLoading) {
            return (
                <Loader />
            );
        }
        if (error) {
            return (
                <Error 
                    errorMessage="Ups! Something happened."
                    errorMessageClassName="side-box-error"
                    retryFunction={retryFunction}
                />
            );
        }
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
                <Link to={this.getFormattedLinkTo(singleData)}>
                    {singleData.content}
                </Link>
            );
        }
        return <p className="box-content ellipsis">{singleData.content}</p>;
    }
    getFormattedLinkTo(singleData) {
        if (singleData.withParam) {
            return singleData.linkTo + '/' + singleData.content + `${singleData.type === 'address' ? '/transactions' : ''}`;
        }
        return singleData.linkTo;
    }
    render() {
        console.log('SideBox')
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
                </div>
            </div>
        );
    }
}
export default SideBox;