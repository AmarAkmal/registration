import React, { Fragment } from "react";
import {Col, Row, Button, Form, FormGroup, Label, Input, FormFeedback, InputGroup, InputGroupText} from "reactstrap";
import { Redirect } from "react-router-dom";
import API from "./api";
import { toastFunc } from "../../../index";
import {Bounce, toast} from "react-toastify";
import LaddaButton, {EXPAND_LEFT} from "react-ladda";
import {setAuth} from "../../../Layout/AppMain";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faEye, faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
// Layout

export default class LOGIN extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            visible: false,
            message: '',
            messageColor: '',
            usernameValidate: false,
            passwordValidate: false,
            passValidate: false,
            redirectHomepage:false,
            isLoading: false,
            loginData:[],
            passType: "password"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    recheckValidation(){
        if (this.state.username != ""){
            this.setState({usernameValidate:false})
        }
        if (this.state.password != ""){
            this.setState({passwordValidate:false})
        }

    }
    validate(){
        let isFailValidation = false;
        if (this.state.username == ""){
            isFailValidation = true;
            this.setState({usernameValidate:true});
        }else{
            this.setState({usernameValidate:false})
        }
        if (this.state.password == ""){
            isFailValidation = true
            this.setState({passwordValidate:true})
        }else
        {
            this.setState({passwordValidate:false})
        }
        if (isFailValidation){
            toastFunc("Please Fill in the required field", 'warning')
        }


        return isFailValidation;
    }
    handleChange(event) {
        this.recheckValidation();
        const target = event.target;
        const name = target.name;
        this.setState(
            {[name]: event.target.value}
        );
    }
    handleSubmit(event) {
        this.setState({isLoading:true})
        event.preventDefault();
        let isFailValidation = this.validate();
        if (!isFailValidation) {
            let postData = {
                "username":this.state.username,
                "password":this.state.password,
            }

            let formData = new FormData();
            formData.append('data', JSON.stringify(postData));

            API.submit_login(formData).then(result => {

                this.setState({isLoading:false})
                if (result.code == '100') {

                    toastFunc(result.message, 'error')
                    if(result.message == "Please enter password correctly"){
                        this.setState(
                            {password:""}
                        );
                    }else{
                        this.setState(
                            {username: "",password:""}
                        );
                    }
                } else if (result.code == '101') {
                    this.setState(
                        {loginData: result.data,redirectHomepage: true}
                    );
                } else if (result instanceof TypeError) {
                    toastFunc("Login Failed. Server error. Please try again later.", 'error')
                } else{
                    toastFunc("Login Failed", 'error')
                }
            });
        }
        else{
            this.setState({isLoading:false})
        }
    }

    handleType(){
        this.setState({passType: this.state.passType === 'password' ? "text" : 'password'})
    }

    render() {
        // localStorage.clear()
        if (this.state.redirectHomepage) {
            setAuth.authenticate(this.state.loginData, this.props.history)
            // return <Redirect push to={'/file-management'} />
        }
        
        return (
            <Fragment>
                <div className="h-100 bg-animation">
                <div className="d-flex h-100 justify-content-center align-items-center">
                    <Col md="8" className="mx-auto app-login-box">
                        {/*<div className="app-logo-inverse mx-auto mb-3" />*/}
                        <div className="modal-dialog w-100 mx-auto">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="h5 modal-title text-center">
                                        <h4 className="mt-2">
                                            <div>Welcome back,</div>
                                            <span>Please sign in to your account below.</span>
                                        </h4>
                                    </div>
                                        <Row>
                                            <Col md={12}>
                                                <FormGroup>
                                                    <Input type="username" name="username" id="username"
                                                           placeholder="Username here..." invalid={this.state.usernameValidate} disabled={this.state.isLoading}  value={this.state.username} onChange={this.handleChange} />

                                                    <FormFeedback>
                                                        Please fill in required field.
                                                    </FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12}>
                                                {/* <FormGroup>
                                                    <Input type={this.state.passType} name="password" id="password" 
                                                           placeholder="Password here..." invalid={this.state.passwordValidate} disabled={this.state.isLoading}   value={this.state.password} onChange={this.handleChange} />
                                                    <FormFeedback>
                                                        Please fill in required field.
                                                    </FormFeedback>
                                                </FormGroup> */}
                                                <FormGroup>
                                                    <InputGroup>
                                                        <Input type={this.state.passType} name="password" id="password" 
                                                        placeholder="Password here..." invalid={this.state.passwordValidate} disabled={this.state.isLoading}   value={this.state.password} onChange={this.handleChange} />
                                                        <InputGroupText className={"btn btn-primary input-group-text rounded-end"} onMouseDown={() => this.handleType()} onMouseUp={() => this.handleType()}
                                                        onMouseLeave={() => {
                                                            this.setState({passType: "password"})
                                                        }}>
                                                            <FontAwesomeIcon className="fa-lg" icon={this.state.passType === 'password' ? faEye : faEyeSlash}/>
                                                        </InputGroupText>
                                                        <FormFeedback>
                                                            Please fill in required field.
                                                        </FormFeedback>
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                </div>
                                <div className="modal-footer clearfix">
                                    <div className="float-end">
                                        {/*<Button color="primary" size="lg" onClick={this.handleSubmit}>*/}
                                        {/*    Login to Dashboard*/}
                                        {/*</Button>*/}

                                        <LaddaButton style={{ width: '200px' }} className="mr-2 btn btn-shadow btn-primary"
                                                     loading={this.state.isLoading}
                                                     onClick={this.handleSubmit} data-style={EXPAND_LEFT}
                                        >Login
                                        </LaddaButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<div className="text-center text-black opacity-8 mt-3">*/}
                        {/*    Powered by Mindmatics Sdn Bhd*/}
                        {/*</div>*/}
                    </Col>
                </div>
            </div>
            </Fragment>
        );
    }
}

