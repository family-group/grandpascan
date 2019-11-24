import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { configureStore } from "./redux/store";
import { Switch, Redirect, Route } from "react-router";
import HomeView from './components/HomeView';
import TransactionsViewContainer from './containers/TransactionsViewContainer';
import BlockViewContainer from './containers/BlockDetailsViewContainer';
import TransactionDetailsViewContainer from './containers/TransactionDetailsViewContainer';
import BlocksViewContainer from './containers/BlocksViewContainer';
import Header from "./components/Header";
import Xhr from "./utils/Xhr";
// import { apiLocal, apiProduction, appEnv } from "./configs/global";
// action

// global constants
export const COINS = {
    grandpa: 1000000,
    son: 1000,
    grandson: 1
};

// store
const store = configureStore();
// export const isIos = /iP(hone|od|ad)/i.test(window.navigator.platform);
Xhr.baseUrl = 'http://localhost:5555/'
// Xhr.baseUrl = 'http://192.168.1.146:5555/'
const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Header />
                    <Switch>
                        <Route path="/" component={HomeView} exact />
                        <Route path="/address/:address/transactions" component={HomeView} exact />
                        <Route path="/block/:blockHash" component={BlockViewContainer} exact />
                        <Route path="/transaction/:transactionDataHash" component={TransactionDetailsViewContainer} exact />
                        <Route path="/transactions" component={TransactionsViewContainer} exact />
                        <Route path="/blocks" component={BlocksViewContainer} exact />
                    </Switch>
            </Router>
        </Provider>
    );
};

export default App;

