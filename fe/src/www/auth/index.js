import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// import AUTH from './auth';
import LOGIN from "./Login";
// import ForgotPassword from "./ForgotPassword";
// import ResetPassword from "./ResetPassword";
// import Register from "./Register";

const Auth = ({match}) => (
    <Fragment>
        <div className="app-container">
            {/*<Route path={`/auth/:data`} component={AUTH}/>*/}
            <Route path={`/login`} component={LOGIN}/>

        </div>

    </Fragment>
);

export default Auth;
