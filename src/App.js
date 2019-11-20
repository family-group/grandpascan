import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { configureStore } from "./redux/store";
import { Switch, Redirect, Route } from "react-router";
import Home from './components/Home';
import Header from "./components/Header";
import Xhr from "./utils/Xhr";
// import { apiLocal, apiProduction, appEnv } from "./configs/global";
// action


// store
const store = configureStore();
// export const isIos = /iP(hone|od|ad)/i.test(window.navigator.platform);
Xhr.baseUrl = 'http://localhost:5555/'
const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Header />
                    <Switch>
                        <Route path="/" component={Home} exact />
                    </Switch>
            </Router>
        </Provider>
    );
};

export default App;

