import React, {Fragment} from "react";

import {Bounce, toast} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import {decode as base64_decode} from 'base-64';
import ModalUpdate from "../../../www/UserManagement/modal/update";

const defaultPic = require('../../../assets/images/profile.png');

function toastView(msg, typeToast) {
    toast(msg, {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: 'top-right',
        type: typeToast
    });
}

class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            isUpdate: false,
            changePassModal: false,
            dataUser: {
                'username': "111",
                'password': "",
                'staffName': "",
                'email': "",
                'accountType': "",
                'agency': "",
            },
        };
    }

    notify2 = () =>
        (this.toastId = toast(
            "You don't have any new items in your calendar for today! Go out and play!",
            {
                transition: Bounce,
                closeButton: true,
                autoClose: 5000,
                position: "bottom-center",
                type: "success",
            }
        ));

    componentDidMount() {
        this.setState({
            dataUser: {
                'id': base64_decode(localStorage.getItem("lkmlu5b2gf")),
                'user_id': base64_decode(localStorage.getItem("mk2lu5b2gf")),
                'username': base64_decode(localStorage.getItem("aazwo7n331")),
                'email': base64_decode(localStorage.getItem("dftyo7n331")),
                'accountType': base64_decode(localStorage.getItem("3leeb6bnmn")),
                'department': base64_decode(localStorage.getItem("fghwo7n3rh")),
                'department_id': base64_decode(localStorage.getItem("fghwo7n3rh")),
                'phoneNo': base64_decode(localStorage.getItem("3lwevwermn")),
                'isUserBox': true,
            }


        })

        // localStorage.setItem('opex0hidhs', base64_encode(data.user_department));
        // localStorage.setItem('aazwo7n331', base64_encode(data.user_staff_name));
        // localStorage.setItem('fghwo7n3rh', base64_encode(data.user_department_id));
        // localStorage.setItem('dftyo7n331', base64_encode(data.user_email));
        // localStorage.setItem('lkmlu5b2gf', base64_encode(data.id));
        // localStorage.setItem('mk2lu5b2gf', base64_encode(data.user_id));
        // localStorage.setItem('3leeb6bnmn', base64_encode(data.user_role));

    }

    handleChangePass = (res) => {
        if (res['code'] === 'Error' && res['message'].includes("VerifyMismatchError")) {
            toastView("Invalid current password", 'error')
        } else if (res['code'] === 'Error' && res['message'] === "new password cannot be your old password") {
            toastView("New password cannot be your old password", 'error')
        } else {
            toastView("Password Changed Successfully", 'success');
            this.setState({changePassModal: false});
        }
    }


    render() {

        return (
            <Fragment>
                {this.state.changePassModal &&
                    <ModalUpdate onToggle={() => this.setState({changePassModal: !this.state.changePassModal})}
                                 backdrop={true} dataUser={this.state.dataUser} handleUpdate={() => this.setState({changePassModal: !this.state.changePassModal})}/>}
                {/*// {this.state.changePassModal &&*/}
                {/*// <ModalChangePass onClose={() => this.setState({changePassModal: false})} handleChangePass={this.handleChangePass}/>}*/}
                <div className="header-btn-lg pe-0" style={{cursor: 'pointer'}}
                     onClick={() => this.setState({changePassModal: true})}>
                    <div className="widget-content p-0">
                        <div id="profile-border-2" className="widget-content-wrapper"
                             onMouseEnter={() => {
                                 // document.getElementById("profile-border-2").style.padding = "7px 7px 7px 7px";
                                 // document.getElementById("profile-border-2").style.boxShadow = "1px 1px 6px 1px grey";
                                 document.getElementById("profile-header").style.color = "grey";
                                 document.getElementById("profile-text").style.color = "grey";
                             }}
                             onMouseLeave={() => {
                                 // document.getElementById("profile-border-2").style.padding = "0 0 0 0";
                                 // document.getElementById("profile-border-2").style.boxShadow = "none";
                                 document.getElementById("profile-header").style.color = "black";
                                 document.getElementById("profile-text").style.color = "black";
                             }}>
                            <div className="widget-content-left">

                                <img width={42} height={42} className="rounded-circle"
                                     style={{'objectFit': 'cover', cursor: 'pointer'}}
                                     src={""}
                                     onError={(e) => {
                                         e.target.onerror = null;
                                         e.target.src = defaultPic
                                     }}
                                     alt=""
                                />
                            </div>
                            <div className="widget-content-left  ms-3 header-user-info">
                                <div id="profile-header"
                                     className="widget-heading">{base64_decode(localStorage.getItem('aazwo7n331'))}</div>
                                <div id="profile-text"
                                     className="widget-subheading">Dept: {base64_decode(localStorage.getItem('opex0hidhs'))} |
                                    Role: {base64_decode(localStorage.getItem('3leeb6bnmn'))}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default UserBox;
