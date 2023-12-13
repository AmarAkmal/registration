import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

import UserManagementList from "./List/index";
import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";
import StudentList from "./List/index";

const StudentPages = ({match}) => (
    <Fragment>
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route exact path={`${match.url}/list`} component={StudentList}/>

                </div>
                {/*<AppFooter />*/}
            </div>
        </div>
    </Fragment>
);

export default StudentPages;
