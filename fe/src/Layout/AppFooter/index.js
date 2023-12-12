import React, { Fragment } from "react";
import MegaMenuFooter from "./Components/FooterMegaMenu";
import FooterDots from "./Components/FooterDots";

class AppFooter extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="app-footer">
          <div className="app-footer__inner" style={{background:'#545cd8', color:'#fff'}}>
            <span style={{fontSize:'12px'}}>Powered by Mindmatics Sdn Bhd</span>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default AppFooter;
