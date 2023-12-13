import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";
import AppFooter from "../../Layout/AppFooter";
import ProgramList from "./List/index";

const ProgramPages = ({match}) => (
    <Fragment>
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route exact path={`/program`} component={ProgramList}/>
                </div>
                {/*<AppFooter />*/}
            </div>
        </div>
    </Fragment>
);

export default ProgramPages;
