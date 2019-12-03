import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { configureStore } from "./redux/store";
import { Switch, Redirect, Route } from "react-router";
import HomeView from './components/HomeView';
import NotFound from './components/NotFound';
import TransactionsViewContainer from './containers/TransactionsViewContainer';
import BlockViewContainer from './containers/BlockDetailsViewContainer';
import PeersViewContainer from './containers/PeersViewContainer';
import TransactionDetailsViewContainer from './containers/TransactionDetailsViewContainer';
import AddressTransactionsViewContainer from './containers/AddressTransactionsViewContainer';
import BlocksViewContainer from './containers/BlocksViewContainer';
import Header from "./components/Header";
import Xhr from "./utils/Xhr";
import ClientSocket from './socket/ClientSocket';



// store
const store = configureStore();
window.__baseUrl = 'http://localhost:5555/';
// window.__baseUrl = 'http://192.168.1.146:5555/'
new ClientSocket('CLIENT_CHANNEL', store.dispatch);


// global constants
export const COINS = {
    grandpa: 1000000,
    son: 1000,
    grandson: 1
};

Xhr.baseUrl = window.__baseUrl;
const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Header />
                    <Switch>
                        <Route path="/" component={HomeView} exact />
                        <Route path="/address/:address/transactions" component={AddressTransactionsViewContainer} exact />
                        <Route path="/block/:blockHash" component={BlockViewContainer} exact />
                        <Route path="/transaction/:transactionDataHash" component={TransactionDetailsViewContainer} exact />
                        <Route path="/transactions" component={TransactionsViewContainer} exact />
                        <Route path="/transactions/pending" component={TransactionsViewContainer} exact />
                        <Route path="/blocks" component={BlocksViewContainer} exact />
                        <Route path="/node/peers" component={PeersViewContainer} exact />
                        <Route path="/not-found/:resource" component={NotFound} exact />
                    </Switch>
            </Router>
        </Provider>
    );
};

export default App;

