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
            entrySessionDropdown: ["July", "Dec"],
            entrySessionYearDropdown: [1, 2, 3, 4, 5, 6],
            facultyDropdown: [],
            programDropdown: [],
            yearOfGradeDropdown: [],
            existingData: this.props.data,
            name: this.props.data['name'],
            icNo: this.props.data['icNo'],
            matrixNo: this.props.data['matrixNo'],
            entrySessionMonth: this.props.data['entrySessionMonth'],
            entrySessionYear: this.props.data['entrySessionYear'],
            faculty:this.props.data['faculty'],
            program: this.props.data['program'],
            status: this.props.data['status'],
            yearOfGrade: this.props.data['yearOfGrade'],

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


    validateUpdate = () => {

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
    updateUser() {

        let valid = this.validateUpdate()
        // let valid = Object.values(this.state.invalid).every((i) => i === true)


        if (valid && !this.state.confSamePass) {
            this.setState({updateLoading: true})

            let params = {


                'id': this.state.existingData['id'],
                "name": this.state.name ? this.state.name : this.state.existingData['name'],
                "icNo":  this.state.name ? this.state.name : this.state.existingData['icNo'],
                'matrixNo':  this.state.matrixNo ? this.state.matrixNo : this.state.existingData['matrixNo'],
                'entrySessionMonth': this.state.entrySessionMonth ? this.state.entrySessionMonth : this.state.existingData['entrySessionMonth'],
                'entrySessionYear': this.state.entrySessionYear ? this.state.entrySessionYear : this.state.existingData['entrySessionYear'],
                'faculty_id': this.state.faculty ? this.state.faculty : this.state.existingData['faculty_id'],
                'program_id':  this.state.program ? this.state.program : this.state.existingData['program_id'],
                'status':  this.state.status ? this.state.status : this.state.existingData['status'],
                'yearOfGrade': this.state.yearOfGrade ? this.state.yearOfGrade : this.state.existingData['yearOfGrade'],
            }
            params = JSON.stringify(params)
            params = window.btoa(params)
            api.update_(params).then(() => this.props.handleUpdate()).catch((err) => {
                this.props.handleUpdate(err)
            })


        } else {
            {
                (!valid ) &&
                toastFunc("Please Fill in the required field", 'warning')
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
                                <Label for="faculty" style={{marginTop: "5px", width: "100%"}}>Program </Label>
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
