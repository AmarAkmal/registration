import React, { Component, Fragment } from "react";

import { Breadcrumb, BreadcrumbItem } from "reactstrap";

import {
  faHouseChimney,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class TitleComponent3 extends Component {
  render() {
    let {
      breadcrumbTitle
    } = this.props;
    return (
      <Fragment>
        <Breadcrumb>
          <BreadcrumbItem>
            <a href="#/student/list" >
              <FontAwesomeIcon icon={faHouseChimney} style={{ color: '#545cd8' }}/>
            </a>
          </BreadcrumbItem>
          {/*<BreadcrumbItem>*/}
          {/*  <a href="https://colorlib.com/" onClick={(e) => e.preventDefault()}>*/}
          {/*    Dashboards*/}
          {/*  </a>*/}
          {/*</BreadcrumbItem>*/}
          <BreadcrumbItem active>{breadcrumbTitle}</BreadcrumbItem>
        </Breadcrumb>
      </Fragment>
    );
  }
}
