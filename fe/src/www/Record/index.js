import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";
import AppFooter from "../../Layout/AppFooter";
import RecordList from "./List/index";

const RecordPages = ({match}) => (
    <Fragment>
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`/record`} component={RecordList}/>
                    {/*<Route path={`${match.url}/register`} component={UserManagementRegister}/>*/}
                </div>
                <AppFooter />
            </div>
        </div>
    </Fragment>
);

export default RecordPages;
