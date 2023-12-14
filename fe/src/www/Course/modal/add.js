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

export default class ModalAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionDropdown: ["Teras Displin", "Teras Umum", "Wajib"],
            creditHourDropdown: [1, 2, 3, 4, 5, 6],
            facultyDropdown:[],
            code: "",
            name: "",
            section: "",
            creditHour: "",
            result: "",
            faculty: "",
            invalid: {
                code: false,
                name: false,
                section: false,
                creditHour: false,
                result: false,
                faculty: false,

            },
            submitLoading: false,
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

    submit() {
        let valid = this.validateSubmit()

        // let valid = Object.values(this.state.invalid).every((i) => i === true)
        if (valid) {
            this.setState({submitLoading: true})
            let params = {
                "code": this.state.code,
                "name": this.state.name,
                "section": this.state.section,
                'creditHour': this.state.creditHour,
                'result': this.state.result,
                'faculty_id': this.state.faculty,
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
                <ModalHeader>Register New Course</ModalHeader>
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

                                            ['Gred', 'Lulus Gagal'].map((v, i) => {
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
                                 onClick={() => this.submit()} data-style={EXPAND_LEFT}
                    >Submit
                    </LaddaButton>

                    <Button style={{width: '140px'}}
                            className='mr-2 btn-icon btn-shadow btn-danger'
                            onClick={() => {
                                this.props.onToggle();
                            }}
                    >
                        Cancel
                    </Button>

                </ModalFooter>
            </Modal>
        </>)
    }

}
