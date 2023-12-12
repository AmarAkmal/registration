import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MetisMenu from "react-metismenu";
import { setEnableMobileMenu } from "../../reducers/ThemeOptions";
import nav from "./NavItems";
import {decode as base64_decode, encode as base64_encode} from 'base-64';

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      nav:nav.MainNaviExport(base64_decode(localStorage.getItem('3leeb6bnmn'))),
    };

  }

  toggleMobileSidebar = () => {
    let { enableMobileMenu, setEnableMobileMenu } = this.props;
    setEnableMobileMenu(!enableMobileMenu);
  };

  render() {
    return (
      <Fragment>
        <h5 className="app-sidebar__heading">Menu</h5>
        <MetisMenu content={this.state.nav} onSelected={this.toggleMobileSidebar} activeLinkFromLocation
          className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
      </Fragment>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}
const mapStateToProps = (state) => ({
  enableMobileMenu: state.ThemeOptions.enableMobileMenu,
});

const mapDispatchToProps = (dispatch) => ({
  setEnableMobileMenu: (enable) => dispatch(setEnableMobileMenu(enable)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));
