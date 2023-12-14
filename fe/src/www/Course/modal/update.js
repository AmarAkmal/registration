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


            existingData: this.props.data,
            sectionDropdown: ["Teras Displin", "Teras Umum", "Wajib"],
            creditHourDropdown: [1, 2, 3, 4, 5, 6],
            facultyDropdown:[],
            code: this.props.data['code'],
            name: this.props.data['name'],
            section:this.props.data['section'],
            creditHour: this.props.data['creditHour'],
            result: this.props.data['result'],
            faculty: this.props.data['faculty_id'],
            faculty_id: this.props.data['faculty_id'],
            invalid: {
                code: false,
                name: false,
                section: false,
                creditHour: false,
                result: false,
                faculty: false,

            },
            updateLoading: false,


        }

        this.handleChange = this.handleChange.bind(this);

    }
    componentDidMount() {
        api.get_department().then((response) => {
            this.setState({
                facultyDropdown: response['data']
            })
        })
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState(
            {
                [name]: event.target.value,
                invalid: {...this.state.invalid, [name]: false},
            }
        );

    }

    validateSubmit = () => {
        let valid = true
        if (!this.state.code || !this.state.name || !this.state.section || !this.state.creditHour || !this.state.result|| !this.state.faculty) {

            valid = false
        }


        if (valid === false) {
            this.setState({
                invalid: {
                    code: this.state.code === '',
                    name: this.state.name === '',
                    section: this.state.section === '',
                    creditHour: this.state.creditHour === '',
                    result: this.state.result === '',
                    faculty: this.state.faculty === '',

                }
            });
        }
        return valid
    }
    validateUpdate = () => {

        let valid = true
        if (!this.state.code || !this.state.name || !this.state.section || !this.state.creditHour || !this.state.result|| !this.state.faculty) {

            valid = false
        }


        if (valid === false) {
            this.setState({
                invalid: {
                    code: this.state.code === '',
                    name: this.state.name === '',
                    section: this.state.section === '',
                    creditHour: this.state.creditHour === '',
                    result: this.state.result === '',
                    faculty: this.state.faculty === '',

                }
            });
        }
        return valid
    }
    updateUser() {

        let valid = this.validateUpdate()
        // let valid = Object.values(this.state.invalid).every((i) => i === true)


        if (valid && !this.state.confSamePass) {
            this.setState({updateLoading: true})

            // "code": this.state.code,
            //     "name": this.state.name,
            //     "section": this.state.section,
            //     'creditHour': this.state.creditHour,
            //     'result': this.state.result,
            //     'faculty_id': this.state.faculty,
            let params = {

                'id': this.state.existingData['id'],
                "code": this.state.code ? this.state.code : this.state.existingData['code'],
                "name": this.state.name ? this.state.name : this.state.existingData['name'],
                "section": this.state.section ? this.state.section : this.state.existingData['section'],
                "creditHour": this.state.creditHour ? this.state.creditHour : this.state.existingData['creditHour'],
                "result": this.state.result ? this.state.result : this.state.existingData['result'],
                "faculty_id": this.state.faculty ? this.state.faculty : this.state.existingData['faculty_id'],
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
                <ModalHeader>Update Course</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.submit}>

                        <Row style={{padding: "10px 20px 10px 20px"}}>
                            <Col md={2}>
                                <Label style={{marginTop: "5px", width: "100%"}}>Code</Label>
                            </Col>
                            <Col md={10}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.code}
                                           required={true} type="text" name="code"
                                           id="code" placeholder="Type here" value={this.state.code}
                                           onChange={this.handleChange}/>
                                    <FormFeedback>Fill in the required field</FormFeedback>
                                </FormGroup>
                            </Col>

                        </Row>
                        <Row style={{padding: "10px 20px 10px 20px"}}>
                            <Col md={2}>
                                <Label style={{marginTop: "5px", width: "100%"}}>Name</Label>
                            </Col>
                            <Col md={10}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.name}
                                           required={true} type="text" name="name"
                                           id="name" placeholder="Type here" value={this.state.name}
                                           onChange={this.handleChange}/>
                                    <FormFeedback>Fill in the required field</FormFeedback>
                                </FormGroup>
                            </Col>

                        </Row>

                        <Row style={{padding: "10px 20px 10px 20px"}}>
                            <Col md={2}>
                                <Label for="section" style={{marginTop: "5px", width: "100%"}}>Section</Label>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.section} type={'select'} name="section"
                                           value={this.state.section} onChange={this.handleChange}>
                                        <option key={'section'} value={''} disabled>Please select</option>
                                        {

                                            this.state.sectionDropdown.map((v, i) => {
                                                return <option key={v} value={v}>{v}</option>
                                            })
                                        }
                                    </Input>

                                    <FormFeedback>Fill in the required field</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <Label for="section" style={{marginTop: "5px", width: "100%"}}>Credit Hour</Label>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.creditHour} type={'select'} name="creditHour"
                                           value={this.state.creditHour} onChange={this.handleChange}>
                                        <option key={'section'} value={''} disabled>Please select</option>
                                        {

                                            this.state.creditHourDropdown.map((v, i) => {
                                                return <option key={v} value={v}>{v}</option>
                                            })
                                        }
                                    </Input>

                                    <FormFeedback>Fill in the required field</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row style={{padding: "10px 20px 10px 20px"}}>
                            <Col md={2}>
                                <Label for="section" style={{marginTop: "5px", width: "100%"}}>Type of Result</Label>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.result} type={'select'} name="result"
                                           value={this.state.result} onChange={this.handleChange}>
                                        <option key={'result'} value={''} disabled>Please select</option>
                                        {

                                            ['Gred','Lulus Gagal'].map((v, i) => {
                                                return <option key={v} value={v}>{v}</option>
                                            })
                                        }
                                    </Input>

                                    <FormFeedback>Fill in the required field</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <Label for="faculty" style={{marginTop: "5px", width: "100%"}}>Faculty</Label>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.faculty} type={'select'} name="faculty"
                                           value={this.state.faculty} onChange={this.handleChange}>
                                        <option key={'faculty'} value={''} disabled>Please select</option>
                                        {

                                            this.state.facultyDropdown.map((v, i) => {
                                                return <option key={v.id} value={v.id}>{v.name}</option>
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
