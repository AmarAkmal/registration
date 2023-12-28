import "./polyfills";
import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";

import {HashRouter} from "react-router-dom";
import "./assets/base.scss";
import Main from "./www/Main";
import configureStore from "./config/configureStore";
import {Provider} from "react-redux";
import {Bounce, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {decode as base64_decode, encode as base64_encode} from 'base-64';

const store = configureStore();
const rootElement = document.getElementById("root");


if (window.location.hostname !== "localhost") {
    global.ipServer = window.location.origin + ":8080/";
} else {
    global.ipServer = `http://${window.location.hostname}:8080/`;
}


global.staff_name = base64_decode(localStorage.getItem('aazwo7n331'));
global.agency = base64_decode(localStorage.getItem('opex0hidhs'));
global.role = base64_decode(localStorage.getItem('3leeb6bnmn'));


export const toastFunc = (msg, type) => {
    toast(msg, {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: 'top-right',
        type: type
    });
}
export const toastFuncManualClose = (msg, type) => {
    toast(msg, {
        transition: Bounce,
        closeButton: true,
        autoClose: false,
        position: 'top-right',
        type: type
    });
}


const renderApp = (Component) => {
    ReactDOM.render(
        <Provider store={store}>
            <HashRouter>
                <Component/>
            </HashRouter>
        </Provider>,
        rootElement
    );
};


export const redirectLogout = () => {

    localStorage.removeItem('opex0hidhs');
    localStorage.removeItem('aazwo7n331');
    localStorage.removeItem('mk2lu5b2gf');
    localStorage.removeItem('3leeb6bnmn');
    window.location.replace(`${window.location.origin}/centromeres/#/login`)
};

renderApp(Main);

if (module.hot) {
    module.hot.accept("./www/Main", () => {
        const NextApp = require("./www/Main").default;
        renderApp(NextApp);
    });
}
serviceWorker.unregister();
