import React from "react";
import {
    Button,
    Col,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    FormFeedback,
    Form,
    UncontrolledTooltip
} from "reactstrap";

import { toastFunc } from "../../../index"
import LaddaButton, { EXPAND_LEFT } from "react-ladda";
import { Bounce, toast } from "react-toastify";
import { Combobox, DropdownList } from "react-widgets";
import api from "../api";
import { validate } from 'react-email-validator';
import { Redirect } from "react-router-dom";

import { decode as base64_decode, encode as base64_encode } from 'base-64';


export default class ModalChangePass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_password: "",
            new_password: "",
            conf_new_password: "",
            invalid: {
                current_password: false,
                new_password: false,
                conf_new_password: false,
            },
            updateLoading: false,
            notChanged: true,
            lengthPassValid: false,
            confSamePass: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        // if(this.state.current_password === "" && this.state.new_password === "" && this.state.conf_new_password === ""){
        //     this.setState({notChanged: true})
        // }
        this.setState({
            [name]: event.target.value,
            invalid: { ...this.state.invalid, [name]: false },
            notChanged: this.state.current_password === "" || this.state.new_password === "" || this.state.conf_new_password === ""
        });
        if (name === 'conf_new_password') {
            let matchPass = event.target.value === this.state.new_password
            this.setState({ confSamePass: matchPass ? false : true })
        }
        if (name === 'new_password') {
            let matchPass = this.state.conf_new_password === event.target.value
            this.setState({ confSamePass: matchPass ? false : true })
            let lengthPass = event.target.value.length < 8
            this.setState({ lengthPassValid: lengthPass })
        }
        if (event.target.value === "") {
            this.setState({ notChanged: true })
        }
    }

    validateUpdate = () => {
        let valid = true
        if (!this.state.current_password || !this.state.new_password || !this.state.conf_new_password) {
            valid = false
            this.setState({
                invalid: {
                    current_password: this.state.current_password === '' ? true : false,
                    new_password: this.state.new_password === '' ? true : false,
                    conf_new_password: this.state.conf_new_password === '' ? true : false,
                }
            });
        }
        if (this.state.new_password) {
            let lengthPass = this.state.new_password.length < 8
            this.setState({ lengthPassValid: lengthPass ? true : false })
        }
        if (this.state.conf_new_password) {
            let matchPass = this.state.conf_new_password === this.state.new_password
            if (!matchPass) {
                this.setState({ confSamePass: true })
                // valid = false
            }
        }
        return valid
    }

    updatePass() {

        let valid = this.validateUpdate()

        if (valid && !this.state.confSamePass && !this.state.lengthPassValid) {
            this.setState({ updateLoading: true })
            let params = {
                user_id: base64_decode(localStorage.getItem('mk2lu5b2gf')),
                curr_pass: this.state.current_password,
                new_pass: this.state.new_password,
                conf_new_pass: this.state.conf_new_password
            }
            params = JSON.stringify(params)
            params = window.btoa(params)
            api.change_password(params).then((res) => {
                this.props.handleChangePass(res)
                if (res['code'] === 'Error') {
                    this.setState({ updateLoading: false })
                }
            }).catch((err) => {
                console.log(err)
            })
        }
        else {
            {
                (!valid || (!this.state.confSamePass && !this.state.lengthPassValid)) &&
                toastFunc("Please Fill in the required field", 'warning')
            }

            {
                (this.state.lengthPassValid && valid) &&
                toastFunc("Password must have 8 character minimum", 'warning')
            }

            {
                (this.state.confSamePass && valid) &&
                toastFunc("Password does not match", 'warning')
            }
        }
    }

    render() {
        return (<>
            <Modal centered={true} size='lg' isOpen={true} backdrop={true}>
                <ModalHeader>Change New Password</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.submit}>
                        <div className=" px-3">
                            <Row className=" py-2">
                                <Col md={3}>
                                    <Label>Current Password</Label>
                                </Col>
                                <Col md={9}>
                                    <FormGroup>
                                        <Input type="password" invalid={this.state.invalid.current_password} name="current_password" id="currpassword"
                                            placeholder="Type here" value={this.state.current_password} onChange={this.handleChange} minLength={8} />
                                        <FormFeedback>Fill in the required field</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="py-2">
                                <Col md={3}>
                                    <Label>New Password</Label>
                                </Col>
                                <Col md={9}>
                                    <FormGroup>
                                        <Input type="password" invalid={this.state.invalid.new_password || this.state.lengthPassValid} name="new_password" id="newpassword"
                                            placeholder="Type here" value={this.state.new_password} onChange={this.handleChange} minLength={8} />
                                        {this.state.lengthPassValid ?
                                            <FormFeedback>Password must have 8 character minimum.</FormFeedback>
                                            :
                                            <FormFeedback>Fill in the required field</FormFeedback>}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="py-2">
                                <Col md={3}>
                                    <Label>Confirm New Password</Label>
                                </Col>
                                <Col md={9}>
                                    <FormGroup>
                                        <Input type="password" invalid={this.state.invalid.conf_new_password || this.state.confSamePass} name="conf_new_password" id="confnewpassword"
                                            placeholder="Type here" value={this.state.conf_new_password} onChange={this.handleChange} minLength={8} />
                                        {this.state.confSamePass ?
                                            <FormFeedback>Password does not match.</FormFeedback>
                                            :
                                            <FormFeedback>Fill in the required field</FormFeedback>}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <span id="update-button">
                        <LaddaButton style={{ width: '140px' }} className="mr-2 btn btn-shadow btn-primary"
                            loading={this.state.updateLoading}
                            disabled={this.state.notChanged}
                            onClick={() => this.updatePass()} data-style={EXPAND_LEFT}
                        >
                            Update
                        </LaddaButton>
                        {this.state.notChanged &&
                            <UncontrolledTooltip placement={"top"}
                                target="update-button">
                                Please fill in all the required field
                            </UncontrolledTooltip>}
                    </span>
                    <Button style={{ width: '140px' }}
                        className='mr-2 btn-icon btn-shadow btn-danger'
                        onClick={() => {
                            this.props.onClose();
                        }}
                    >
                        {/*<i*/}
                        {/*className="lnr-cross btn-icon-wrapper"> </i>*/}
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>)
    }

}
