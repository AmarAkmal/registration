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
            entrySessionDropdown: ["July", "Dec"],
            entrySessionYearDropdown: [1, 2, 3, 4, 5, 6],
            facultyDropdown: [],
            programDropdown: [],
            yearOfGradeDropdown: [],

            name: "",
            icNo: "",
            matrixNo: "",
            entrySessionMonth: "",
            entrySessionYear: "",
            faculty: "",
            program: "",
            status: "",
            yearOfGrade: "",

            invalid: {
                name: false,
                icNo: false,
                matrixNo: false,
                entrySessionMonth: false,
                entrySessionYear: false,
                program: false,
                faculty: false,
                status: false,
                yearOfGrade: false,
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
        api.get_program().then((response) => {
            this.setState({
                programDropdown: response['data']
            })
        })
        let yearList = []
        for (let year = 2018; year <= 2050; year++) {
            yearList.push(year)

        }
        this.setState({yearOfGradeDropdown: yearList})
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
        if (!this.state.name || !this.state.icNo || !this.state.matrixNo || !this.state.entrySessionMonth || !this.state.entrySessionYear || !this.state.faculty || !this.state.program || !this.state.status || !this.state.yearOfGrade) {

            valid = false
        }


        if (valid === false) {
            this.setState({
                invalid: {
                    name: this.state.name === '',
                    icNo: this.state.icNo === '',
                    matrixNo: this.state.matrixNo === '',
                    entrySessionMonth: this.state.entrySessionMonth === '',
                    entrySessionYear: this.state.entrySessionYear === '',
                    faculty: this.state.faculty === '',
                    program: this.state.program === '',
                    status: this.state.status === '',
                    yearOfGrade: this.state.yearOfGrade === '',

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
                "name": this.state.name,
                "icNo": this.state.icNo,
                'matrixNo': this.state.matrixNo,
                'entrySessionMonth': this.state.entrySessionMonth,
                'entrySessionYear': this.state.entrySessionYear,
                'faculty_id': this.state.faculty,
                'program_id': this.state.program,
                'status': this.state.status,
                'yearOfGrade': this.state.yearOfGrade,
            }

            params = JSON.stringify(params)
            params = window.btoa(params)
            api.add_(params).then(e => {

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
                (!valid) &&
                toastFunc("Please Fill in the required field", 'warning')
            }

        }
    }

    render() {
        return (<>

            <Modal centered={true} isOpen={true} size='lg' backdrop={true}>
                <ModalHeader>Register New Student</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.submit}>


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
                                <Label style={{marginTop: "5px", width: "100%"}}>IC No.</Label>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.icNo}
                                           required={true} type="text" name="icNo"
                                           id="name" placeholder="Type here" value={this.state.icNo}
                                           onChange={this.handleChange}/>
                                    <FormFeedback>Fill in the required field</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <Label style={{marginTop: "5px", width: "100%"}}>Matrix No</Label>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.matrixNo}
                                           required={true} type="text" name="matrixNo"
                                           id="matrixNo" placeholder="Type here" value={this.state.matrixNo}
                                           onChange={this.handleChange}/>
                                    <FormFeedback>Fill in the required field</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row style={{padding: "10px 20px 10px 20px"}}>
                            <Col md={2}>
                                <Label for="section" style={{marginTop: "5px", width: "100%"}}>Entry Session</Label>
                            </Col>
                            <Col md={5}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.entrySessionMonth} type={'select'}
                                           name="entrySessionMonth"
                                           value={this.state.entrySessionMonth} onChange={this.handleChange}>
                                        <option key={'entrySessionMonth'} value={''} disabled>Please select</option>
                                        {

                                            this.state.entrySessionDropdown.map((v, i) => {
                                                return <option key={v} value={v}>{v}</option>
                                            })
                                        }
                                    </Input>

                                    <FormFeedback>Fill in the required field</FormFeedback>
                                </FormGroup>
                            </Col>

                            <Col md={5}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.entrySessionYear} type={'select'} name="entrySessionYear"
                                           value={this.state.entrySessionYear} onChange={this.handleChange}>
                                        <option key={'section'} value={''} disabled>Please select</option>
                                        {

                                            this.state.yearOfGradeDropdown.map((v, i) => {
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
                            <Col md={2}>
                                <Label for="faculty" style={{marginTop: "5px", width: "100%"}}>Program</Label>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.program} type={'select'} name="program"
                                           value={this.state.program} onChange={this.handleChange}>
                                        <option key={'program'} value={''} disabled>Please select</option>
                                        {

                                            this.state.programDropdown.map((v, i) => {
                                                return <option key={v.id} value={v.id}>{v.name}</option>
                                            })
                                        }
                                    </Input>

                                    <FormFeedback>Fill in the required field</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row style={{padding: "10px 20px 10px 20px"}}>

                            <Col md={2}>
                                <Label for="faculty" style={{marginTop: "5px", width: "100%"}}>Status</Label>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.status} type={'select'} name="status"
                                           value={this.state.status} onChange={this.handleChange}>
                                        <option key={'status'} value={''} disabled>Please select</option>
                                        {

                                            ["Berhenti", "Dalam Pengajian", "Gagal Berhenti", "Tamat",].map((v, i) => {
                                                return <option key={v} value={v}>{v}</option>
                                            })
                                        }
                                    </Input>

                                    <FormFeedback>Fill in the required field</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <Label for="faculty" style={{marginTop: "5px", width: "100%"}}>Year Of Grade</Label>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.yearOfGrade} type={'select'} name="yearOfGrade"
                                           value={this.state.yearOfGrade} onChange={this.handleChange}>
                                        <option key={'yearOfGrade'} value={''} disabled>Please select</option>
                                        {

                                            this.state.yearOfGradeDropdown.map((v, i) => {
                                                return <option key={v} value={v}>{v}</option>
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
