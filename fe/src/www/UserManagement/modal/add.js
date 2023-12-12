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

export default class ModalAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // departmentDropdown: [
            //     { id: 'UGAT', value: 'UGAT' },
            //     { id: 'BPK', value: 'BPK' },
            //     { id: 'CONTRACTOR', value: 'CONTRACTOR' },
            // ],
            departmentDropdown: [],
            accountTypeDropdown: ['Normal', 'Admin'],
            // accountTypeDropdown: [
            //     { id: 'Normal', value: 'Normal' },
            //     { id: 'Admin', value: 'Admin' },
            // ],
            username: "",
            password: "",
            confPass: "",
            phoneNo: "",
            emailSame: "",
            email: "",
            accountType: "",
            department: "",
            userId: "",
            invalid: {
                username: false,
                password: false,
                phoneNo: false,
                email: false,
                invalidUserId: false,
                accountType: false,
                confPass: false,
                department: false,
                userId: false
            },
            submitLoading: false,
            invalidEmail: false,
            invalidUserName: false,
            invalidUserId: false,
            confSamePass: false,

            userIdSame: false,
            userEmailSame: false,
            lengthPassValid: false,
            listUsername: [],
            listEmail: [],
            notChanged: true
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
            console.log(this.state.listEmail)
            let emailValid = validate(event.target.value)
            this.setState({
                invalidEmail: emailValid ? false : true,
                userEmailSame: this.state.listEmail.some((un) => {
                    return un.toUpperCase() === event.target.value.toUpperCase()
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

        if (name === 'confPass') {
            let matchPass = event.target.value === this.state.password
            this.setState({confSamePass: matchPass ? false : true})
        }
        if (name === 'password') {
            let matchPass = this.state.confPass === event.target.value
            this.setState({confSamePass: matchPass ? false : true})
            let lengthPass = event.target.value.length < 8
            this.setState({lengthPassValid: lengthPass ? true : false})
        }
        this.setState(
            {
                [name]: event.target.value,
                invalid: {...this.state.invalid, [name]: false},
                // notChanged: (this.state.username === "" || this.state.password === ""  || this.state.confPass === ""
                //             || this.state.email === ""  || this.state.phoneNo === "" || (department || accountType))
            }
        );
        // if(event.target.value===""){
        //     this.setState({notChanged: true})
        // }
    }

    validateSubmit = () => {
        let valid = true
        if (!this.state.username || !this.state.password || !this.state.phoneNo || !this.state.email || !this.state.accountType || !this.state.department) {

            valid = false
        }


        if (valid === false) {
            this.setState({
                invalid: {
                    username: this.state.username === '' ? true : false,
                    password: this.state.password === '' ? true : false,
                    phoneNo: this.state.phoneNo === '' ? true : false,
                    email: this.state.email === '' ? true : false,
                    userId: this.state.userId === '' ? true : false,
                    accountType: this.state.accountType === '' ? true : false,
                    department: this.state.department === '' ? true : false,
                    confPass: this.state.confPass === '' ? true : false
                }
            });
        }


        if (this.state.email) {
            this.setState({

                userEmailSame: this.state.listEmail.some((un) => {
                    return un.toUpperCase() === this.state.email.toUpperCase()
                })
            })

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

        if (this.state.userEmailSame) {

            valid = false
        }
        return valid
    }

    handleOnChange() {
        this.setState({notChanged: true})
    }

    submit() {
        let valid = this.validateSubmit()

        // let valid = Object.values(this.state.invalid).every((i) => i === true)
        if (valid && !this.state.confSamePass && !this.state.invalidEmail && !this.state.lengthPassValid) {
            this.setState({submitLoading: true})
            let params = {
                "userId": this.state.userId,
                "phoneNo": this.state.phoneNo,
                "userName": this.state.username,
                'password': this.state.password,
                'department': this.state.department,
                'email': this.state.email,
                'is_admin': this.state.accountType,
            }

            params = JSON.stringify(params)
            params = window.btoa(params)
            api.add_user_profile(params).then(e => {

                if (e.code == 'OK') {
                    this.props.handleAdd()
                } else {
                    toastFunc(e.message, 'error')
                }

            }).catch((err) => {
                this.props.handleAdd(err)
            })
        } else {
            {
                (!valid || (!this.state.confSamePass && !this.state.invalidEmail && !this.state.lengthPassValid)) &&
                toastFunc("Please Fill in the required field", 'warning')
            }

            {
                (this.state.lengthPassValid && valid) &&
                toastFunc("Password must have 8 character minimum", 'warning')
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

            <Modal centered={true} isOpen={true} size='lg' backdrop={true}>
                <ModalHeader>Register New User</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.submit}>

                        <Row style={{padding: "10px 20px 10px 20px"}}>
                            <Col md={2}>
                                <Label style={{marginTop: "5px", width: "100%"}}>Name</Label>
                            </Col>
                            <Col md={10}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.username}
                                           required={true} type="text" name="username"
                                           id="username" placeholder="Type here" value={this.state.username}
                                           onChange={this.handleChange}/>
                                    <FormFeedback>Fill in the required field</FormFeedback>
                                </FormGroup>
                            </Col>


                        </Row>
                        <Row style={{padding: "10px 20px 10px 20px"}}>
                            <Col md={2}>
                                <Label for="Phone no." style={{marginTop: "5px", width: "100%"}}>ID</Label>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.userId || this.state.userIdSame} required={true}
                                           type="text"
                                           name="userId" id="userId"
                                           placeholder="Type here" value={this.state.userId}
                                           onChange={this.handleChange}/>
                                    {this.state.userIdSame ?
                                        <FormFeedback>User Id already taken. Please enter a different
                                            User Id</FormFeedback>
                                        :
                                        <FormFeedback>Fill in the required field</FormFeedback>}
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <Label for="Phone no." style={{marginTop: "5px", width: "100%"}}>Phone No.</Label>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.phoneNo} required={true} type="text"
                                           name="phoneNo" id="phoneNo"
                                           placeholder="Type here" value={this.state.phoneNo}
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
                                        required={true}
                                        type="email" name="email" id="email"
                                        placeholder="Type here" value={this.state.email}
                                        onChange={this.handleChange}/>
                                    {
                                        this.state.userEmailSame ?
                                            <FormFeedback>Email already taken. Please enter a different
                                                email</FormFeedback>
                                            :
                                            this.state.invalidEmail ?
                                                <FormFeedback>Enter a valid Email</FormFeedback>
                                                :
                                                <FormFeedback>Fill in the required field</FormFeedback>}
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row style={{padding: "10px 20px 10px 20px"}}>
                            <Col md={2}>
                                <Label style={{marginTop: "5px", width: "100%"}}>Password</Label>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.password || this.state.lengthPassValid}
                                           required={true} type="password" name="password"
                                           id="password" placeholder="Type here" value={this.state.password}
                                           onChange={this.handleChange} minLength={8}/>
                                    {this.state.lengthPassValid ?
                                        <FormFeedback>Password must have 8 character minimum.</FormFeedback>
                                        :
                                        <FormFeedback>Fill in the required field</FormFeedback>}
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <Label style={{marginTop: "5px", width: "100%"}}>Confirm Password</Label>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.confPass || this.state.confSamePass}
                                           required={true} type="password" placeholder="Type here"
                                           name="confPass" id="confPass" value={this.state.confPass}
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
                                <Label for="department" style={{marginTop: "5px", width: "100%"}}>Department</Label>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.department} type={'select'} name="department"
                                           value={this.state.department} onChange={this.handleChange}>
                                        <option key={'department'} value={''} disabled>Please select</option>
                                        {

                                            this.state.departmentDropdown.map((v, i) => {
                                                return <option key={v.id} value={v.id}>{v.name}</option>
                                            })
                                        }
                                    </Input>

                                    <FormFeedback>Fill in the required field</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <Label for="accountType" style={{marginTop: "5px", width: "100%"}}>Account Type</Label>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.accountType} type={'select'} name="accountType"
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
                        // loading={this.state.submitLoading}
                        //  disabled={this.state.notChanged}
                                 onClick={() => this.submit()} data-style={EXPAND_LEFT}
                    >Submit
                    </LaddaButton>
                    {/* <Button style={{ width: '140px' }} color="success"
                        className='mb-2 mr-2 btn-icon btn-shadow btn-outline' outline
                        onClick={() => {
                            this.submit()
                        }}
                    ><i
                        className="lnr-cloud-upload btn-icon-wrapper"> </i>Submit
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
