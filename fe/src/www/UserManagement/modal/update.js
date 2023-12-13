import React from "react";
import {
    Button,
    Col,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from "reactstrap";

import {toastFunc} from "../../../index"
import LaddaButton, {EXPAND_LEFT} from "react-ladda";
import api from "../api";
import {validate} from 'react-email-validator';

import {decode as base64_decode} from 'base-64';


export default class ModalUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // departmentDropdown: [
            //     { id: 'UGAT', value: 'UGAT' },
            //     { id: 'BPK', value: 'BPK' },
            //     { id: 'CONTRACTOR', value: 'CONTRACTOR' },
            // ],
            // accountTypeDropdown: [
            //     { id: 'Normal', value: 'Normal' },
            //     { id: 'Admin', value: 'Admin' },
            // ],
            departmentDropdown: [],
            accountTypeDropdown: ['Super User','Admin','Normal'],
            existingData: this.props.dataUser,
            userid: this.props.dataUser['user_id'],
            username: this.props.dataUser['username'],
            phoneNo: this.props.dataUser['phoneNo'],
            password: "",
            confPass: "",
            email: this.props.dataUser['email'],
            accountType: this.props.dataUser['accountType'],
            department: this.props.dataUser['department'],
            notChanged: true,
            confSamePass: false,
            userNameSame: false,
            invalid: {
                username: false,
                password: false,
                confPass: false,
                email: false,
                accountType: false,
                department: false
            },
            updateLoading: false,
            invalidEmail: false,
            listUsername: [],

        }

        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {


        api.get_email().then((response) => {
            this.setState({
                listEmail: response['data']
            })
        })
        api.get_userId().then((response) => {
            this.setState({
                listUserId: response['data']
            })
        })
        api.get_department().then((response) => {
            this.setState({
                departmentDropdown: response['data']
            })
        })
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;


        if (name == 'email') {

            let emailValid = validate(event.target.value)
            this.setState({
                invalidEmail: emailValid ? false : true,
                userEmailSame: this.state.listEmail.some((un) => {
                    if (this.props.dataUser.email.toUpperCase() != event.target.value.toUpperCase()) {
                        return un.toUpperCase() === event.target.value.toUpperCase()
                    } else {
                        return false
                    }

                })
            })

        }
        if (name == 'userId') {
            console.log(this.state.listUserId)
            let userIdValid = validate(event.target.value)
            this.setState({
                invalidUserId: userIdValid ? false : true,
                userIdSame: this.state.listUserId.some((un) => {
                    return un.toUpperCase() === event.target.value.toUpperCase()
                })
            })

        }
        if (name === 'password') {
            let matchPass = this.state.password === event.target.value
            this.setState({confSamePass: matchPass ? false : true})
            // let lengthPass = event.target.value.length < 8
            // this.setState({lengthPassValid: lengthPass ? true : false})


        }
        if (name === 'confPass') {


            let matchPass = event.target.value === this.state.password
            this.setState({confSamePass: matchPass ? false : true})


        }


        this.setState({
            [name]: event.target.value,
            invalid: {...this.state.invalid, [name]: false},
            notChanged: false,
            updateLoading: false
        });
    }

    validateUpdate = () => {

        let valid = true
        console.log(this.state.username)
        console.log(this.state.phoneNo)
        console.log(this.state.email)
        console.log(this.state.accountType)
        console.log(this.state.department)
        if (!this.state.username || !this.state.phoneNo || !this.state.email || !this.state.accountType || !this.state.department) {

            valid = false
        }


        if (valid === false) {
            this.setState({
                invalid: {
                    username: this.state.username === '' ? true : false,
                    // password: this.state.password === '' ? true : false,
                    phoneNo: this.state.phoneNo === '' ? true : false,
                    email: this.state.email === '' ? true : false,
                    userId: this.state.userId === '' ? true : false,
                    accountType: this.state.accountType === '' ? true : false,
                    department: this.state.department === '' ? true : false,
                    // confPass: this.state.confPass === '' ? true : false
                }
            });
        }


        if (this.state.password) {
            let lengthPass = this.state.password.length < 8
            this.setState({lengthPassValid: lengthPass ? true : false})
        }
        if (this.state.confPass) {

            let matchPass = this.state.confPass === this.state.password
            if (!matchPass) {
                this.setState({confSamePass: true})
                // valid = false
            }
        }
        if (this.state.email) {
            let emailValid = validate(this.state.email)
            if (!emailValid) {
                this.setState({invalidEmail: true})
                // valid = false
            }
        }

        console.log(valid)

        return valid
    }

    updateUser() {

        let valid = this.validateUpdate()
        // let valid = Object.values(this.state.invalid).every((i) => i === true)


        if (valid && !this.state.confSamePass) {
            this.setState({updateLoading: true})
            let params = {

                'id': this.state.existingData['id'],
                'user_id': this.state.existingData['user_id'],
                "user_name": this.state.username ? this.state.username : this.state.existingData['username'],
                "phoneNo": this.state.phoneNo ? this.state.phoneNo : this.state.existingData['phoneNo'],
                'password': this.state.password,
                'department_id': this.state.department ? this.state.department : this.state.existingData['department'],
                'email': this.state.email ? this.state.email : this.state.existingData['email'],
                'account_type': this.state.accountType ? this.state.accountType : this.state.existingData['accountType'],
            }
            params = JSON.stringify(params)
            params = window.btoa(params)
            api.update_user_profile(params).then(() => this.props.handleUpdate()).catch((err) => {
                this.props.handleUpdate(err)
            })


        } else {
            {
                (!valid || (!this.state.confSamePass && !this.state.invalidEmail && !this.state.userNameSame )) &&
                toastFunc("Please Fill in the required field", 'warning')
            }

            // {
            //     (this.state.lengthPassValid && valid) &&
            //     toastFunc("Password not valid", 'warning')
            // }

            {
                (this.state.userNameSame && valid) &&
                toastFunc("Username already taken.", 'warning')
            }

            {
                (this.state.invalidEmail && valid) &&
                toastFunc("Enter a valid email", 'warning')
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
                <ModalHeader>Update User</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.submit}>
                        <Row style={{padding: "10px 20px 10px 20px"}}>
                            <Col md={2}>
                                <Label style={{marginTop: "5px", width: "100%"}}>Name</Label>
                            </Col>
                            <Col md={10}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.username || this.state.userNameSame}
                                           required={true} type="text" name="username" id="username"
                                            defaultValue={this.state.username}
                                           onChange={this.handleChange}/>
                                    {this.state.userNameSame ?
                                        <FormFeedback>Username already taken. Please enter a different
                                            username</FormFeedback>
                                        :
                                        <FormFeedback>Fill in the required field</FormFeedback>
                                    }
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                            </Col>
                        </Row>

                        <Row style={{padding: "10px 20px 10px 20px"}}>
                            <Col md={2}>
                                <Label for="userid" style={{marginTop: "5px", width: "100%"}}>ID</Label>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Input disabled
                                           type="text"
                                           name="userId" id="userId"
                                           placeholder="Type here" defaultValue={this.state.userid}
                                           onChange={this.handleChange}/>

                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <Label for="Phone no." style={{marginTop: "5px", width: "100%"}}>Phone No.</Label>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.phoneNo} required={true} type="text"
                                           name="phoneNo" id="phoneNo"
                                           placeholder="Type here" defaultValue={this.state.phoneNo}
                                           onChange={this.handleChange}/>
                                    <FormFeedback>Fill in the required field</FormFeedback>
                                </FormGroup>
                            </Col>

                        </Row>

                        <Row style={{padding: "10px 20px 10px 20px"}}>
                            <Col md={2}>
                                <Label for="email" style={{marginTop: "5px", width: "100%"}}>Email</Label>
                            </Col>

                            <Col md={10}>
                                <FormGroup>
                                    <Input
                                        invalid={this.state.invalid.email || this.state.invalidEmail || this.state.userEmailSame}
                                        required={true} type="email" name="email" id="email"
                                        placeholder="Type here" value={this.state.email} onChange={this.handleChange}/>
                                    {this.state.invalidEmail ?
                                        <FormFeedback>Enter a valid Email</FormFeedback>
                                        :
                                        <FormFeedback>Fill in the required field</FormFeedback>}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row style={{padding: "10px 20px 10px 20px"}}>
                            <Col md={2}>
                                <Label style={{marginTop: "5px", width: "100%"}}>New Password</Label>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.password } autoComplete="no-password"
                                           type="password" name="password" id="password"
                                           placeholder="Type here" value={this.state.password}
                                           onChange={this.handleChange} minLength={8}/>
                                    <FormFeedback>Fill in the required field</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <Label style={{marginTop: "5px", width: "100%"}}>Confirm Password</Label>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Input invalid={ this.state.confSamePass}
                                           type="password" name="confPass" id="confPass"
                                           placeholder="Type here" value={this.state.confPass}
                                           onChange={this.handleChange}/>
                                    {this.state.confSamePass ?
                                        <FormFeedback>Password does not match</FormFeedback>
                                        :
                                        <FormFeedback>Fill in the required field</FormFeedback>
                                    }

                                </FormGroup>
                            </Col>
                        </Row>

                        <Row style={{padding: "10px 20px 10px 20px"}}>
                            <Col md={2}>
                                <Label for="department" style={{marginTop: "5px", width: "100%"}}>Faculty</Label>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.department} type={'select'} name="department" disabled={this.props.dataUser.isUserBox}
                                           value={this.state.department} onChange={this.handleChange}>
                                        <option key={'department'} value={''} disabled>Please select</option>
                                        {

                                            this.state.departmentDropdown.map((v, i) => {
                                                return <option key={v.id} value={v.id}>{v.name}</option>
                                            })
                                        }
                                    </Input>
                                    {/* <DropdownList
                                        
                                        name={'department'}
                                        placeholder="Select department"

                                        dataKey="id"
                                        textField="value"
                                        data={this.state.departmentDropdown
                                            .sort()}
                                        onChange={e => {
                                            this.setState({
                                                department: e.id
                                            })
                                        }}

                                        value={this.state.department}
                                    /> */}
                                    <FormFeedback>Fill in the required field</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <Label for="accountType" style={{marginTop: "5px", width: "100%"}}>Account Type</Label>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.accountType} type={'select'} name="accountType" disabled={this.props.dataUser.isUserBox}
                                           value={this.state.accountType} onChange={this.handleChange}>
                                        <option key={'accounttype'} value={''} disabled>Please select</option>
                                        {

                                            this.state.accountTypeDropdown.map((v, i) => {
                                                return <option key={i} value={v}>{v}</option>
                                            })
                                        }
                                    </Input>
                                    <FormFeedback>Fill in the required field</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <LaddaButton style={{width: '140px'}} className="mr-2 btn btn-shadow btn-primary"
                                 loading={this.state.updateLoading}
                                 disabled={this.state.notChanged}
                                 onClick={() => this.updateUser()} data-style={EXPAND_LEFT}
                    >Update
                    </LaddaButton>
                    {/* <Button style={{ width: '140px' }} color="success"
                        className='mr-2 btn-icon btn-shadow'
                        onClick={() => {
                            this.updateUser()
                        }}
                        disabled={this.state.notChanged}
                    ><i
                        className="lnr-cloud-upload btn-icon-wrapper"> </i>Update
                    </Button> */}
                    {/* <Button style={{ width: '140px' }} color="danger"
                        className='mb-2 mr-2 btn-icon btn-shadow btn-outline' outline
                        onClick={() => {
                            this.props.onToggle();
                        }}
                    ><i
                        className="lnr-cross btn-icon-wrapper"> </i>Cancel
                    </Button> */}
                    <Button style={{width: '140px'}}
                            className='mr-2 btn-icon btn-shadow btn-danger'
                            onClick={() => {
                                this.props.onToggle();
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
