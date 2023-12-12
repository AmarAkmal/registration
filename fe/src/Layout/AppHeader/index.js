import React, { Fragment } from "react";
import cx from "classnames";

import { connect } from "react-redux";

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { DropdownToggle, UncontrolledDropdown } from "reactstrap";
import Ionicon from "react-ionicons";
import HeaderLogo from "../AppLogo";

import SearchBox from "./Components/SearchBox";
import MegaMenu from "./Components/MegaMenu";
import UserBox from "./Components/UserBox";
import { Redirect } from "react-router-dom";
import { setAuth } from "../AppMain";

import HeaderDots from "./Components/HeaderDots";
import {redirectLogout} from "../../index";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToLogin:false,
    };

  }
  LogOut() {
    // fakeAuth.signout()
    setAuth.signout()
    // localStorage.removeItem('opex0hidhs');
    // localStorage.removeItem('aazwo7n331');
    // localStorage.removeItem('mk2lu5b2gf');
    // localStorage.removeItem('3leeb6bnmn');
    this.setState(
        {redirectToLogin: true}
    );

  }
  render() {
    let {
      headerBackgroundColor,
      enableMobileMenuSmall,
      enableHeaderShadow,
    } = this.props;

    if (this.state.redirectToLogin) {
      return <Redirect push to={'/login'} />
      window.location.reload()

    }

    return (
      <Fragment>
        <TransitionGroup>
          <CSSTransition component="div"
            className={cx("app-header", headerBackgroundColor, {
              "header-shadow": enableHeaderShadow,
            })}
            appear={true} timeout={1500} enter={false} exit={false}>
            <div>
              <HeaderLogo />
              <div className={cx("app-header__content", {
                  "header-mobile-open": enableMobileMenuSmall,
                })}>
                {/*<div className="app-header-left">*/}
                {/*  <SearchBox />*/}
                {/*  <MegaMenu />*/}
                {/*</div>*/}
                <div className="app-header-right">
                  {/*<HeaderDots />*/}
                  <UserBox {...this.props} />
                  {/* <HeaderRightDrawer /> */}
                  <div className="header-dots">
                    <UncontrolledDropdown>
                      <DropdownToggle color="link">
                        <div className="icon-wrapper icon-wrapper-alt rounded-circle">
                          <div className="icon-wrapper-bg bg-primary" onClick={() => this.LogOut()} />
                          <Ionicon beat={false} color="#545cd8" fontSize="23px"
                                   icon="md-exit" />
                        </div>
                      </DropdownToggle>

                    </UncontrolledDropdown>

                  </div>
                </div>
              </div>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  enableHeaderShadow: state.ThemeOptions.enableHeaderShadow,
  closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
  headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
  enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
