import {Redirect, Route} from "react-router-dom";
import React, {Fragment, lazy, Suspense} from "react";
import Loader from "react-loaders";

import {redirectLogout} from '../../index'
import {ToastContainer} from "react-toastify";
import {encode as base64_encode} from 'base-64';

const Login = lazy(() => import('../../www/auth'));


const RecordPages = lazy(() => import('../../www/Record'));
const ProgramPages = lazy(() => import('../../www/Program'));
const CoursePages = lazy(() => import('../../www/Course'));
const UserManagementPages = lazy(() => import('../../www/UserManagement'));
const SettingPage = lazy(() => import('../../www/Setting'));

const URL = window.location.href.includes("300") || window.location.origin.includes("asus")

export const setAuth = {

    isAuthenticated: true,


    authenticate(data, h) {
        try {
            if (this.isAuthenticated) {
                localStorage.clear()  //clear untuk unauthorized

                localStorage.setItem('opex0hidhs', base64_encode(data.user_department));
                localStorage.setItem('aazwo7n331', base64_encode(data.user_staff_name));
                localStorage.setItem('fghwo7n3rh', base64_encode(data.user_department_id));
                localStorage.setItem('dftyo7n331', base64_encode(data.user_email));
                localStorage.setItem('lkmlu5b2gf', base64_encode(data.id));
                localStorage.setItem('mk2lu5b2gf', base64_encode(data.user_id));
                localStorage.setItem('3leeb6bnmn', base64_encode(data.user_role));
                localStorage.setItem('3lwevwermn', base64_encode(data.user_phone));
                localStorage.setItem('n29pa87zfm', data.token);
                h.push('/record');

            }

        } catch (error) {
            console.log(error)
            redirectLogout()
        }


    },

    signout(cb) {
        // this.isAuthenticated = null
        // redirectLogout()
        localStorage.clear()
    }
}

const PrivateRoute = ({component: Component, ...rest}) => {
    return (URL === true ? <Route {...rest} render={(props) => (
            localStorage.getItem("mk2lu5b2gf") !== null
                ? <Component {...props} />
                : <Redirect to='/login'/>
        )}/>
        : <Route {...rest} render={(props) => (
            localStorage.getItem("mk2lu5b2gf") !== null
                ? <Component {...props} />
                : <Redirect to='/login'/>
        )}/>)
};

const AppMain = () => {

    return (
        <Fragment>


            {/* Login */}
            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <div className="text-center">
                            <Loader type="ball-clip-rotate-multiple"/>
                        </div>
                        <h6 className="mt-5">Please wait while we load all the Components</h6>
                    </div>
                </div>
            }>
                <Route path="/login" component={Login}/>
            </Suspense>


            {/* Record */}
            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <div className="text-center">
                            <Loader type="ball-clip-rotate-multiple"/>
                        </div>
                        <h6 className="mt-5">Please wait while we load all the Components</h6>
                    </div>
                </div>
            }>
                <PrivateRoute path="/record" component={RecordPages}/>
            </Suspense>

            {/* Program */}
            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <div className="text-center">
                            <Loader type="ball-clip-rotate-multiple"/>
                        </div>
                        <h6 className="mt-5">Please wait while we load all the Components</h6>
                    </div>
                </div>
            }>
                <PrivateRoute path="/program" component={ProgramPages}/>
            </Suspense>

            {/* Course */}
            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <div className="text-center">
                            <Loader type="ball-clip-rotate-multiple"/>
                        </div>
                        <h6 className="mt-5">Please wait while we load all the Components</h6>
                    </div>
                </div>
            }>
                <PrivateRoute path="/course" component={CoursePages}/>
            </Suspense>

            {/* User Management */}
            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <div className="text-center">
                            <Loader type="ball-clip-rotate-multiple"/>
                        </div>
                        <h6 className="mt-5">Please wait while we load all the Components</h6>
                    </div>
                </div>
            }>
                <PrivateRoute path="/user-management" component={UserManagementPages}/>
            </Suspense>
            {/* Setting */}
            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <div className="text-center">
                            <Loader type="ball-clip-rotate-multiple"/>
                        </div>
                        <h6 className="mt-5">Please wait while we load all the Components</h6>
                    </div>
                </div>
            }>
                <PrivateRoute path="/setting" component={SettingPage}/>
            </Suspense>


            <Route exact path="/" render={() => (
                <Redirect to="/login"/>
            )}/>

            <ToastContainer/>
        </Fragment>
    )
};

export default AppMain;
