import React from 'react';
import { withRouter } from 'react-router-dom';

// importing styles
import './styles/NotFound.css';

class NotFound extends React.Component {
    constructor() {
        super();
        this.goHome = this.goHome.bind(this);
    }
    goHome() {
        this.props.history.push('/');
    }
    render() {
        return (
            <main className="not-found-container">
                {this.props.match.params.resource && <p>{this.props.match.params.resource}</p>}
                <h2>Not found</h2>
                <div className="full-width flex-c-x-centered">
                    <button onClick={this.goHome} className="btn">Go home</button>
                </div>
            </main>
        );
    }
}
export default withRouter(NotFound);