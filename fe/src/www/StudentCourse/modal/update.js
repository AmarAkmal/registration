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
            courseDropdown :[],
            matrixNoDropdown :[],
            existingData: this.props.data,

            course: this.props.data.course,
            matrixNo: this.props.data.matrixNo,
            studentName:this.props.data.studentName,
            grade:this.props.data.grade,
            invalid: {

                course: false,
                matrixNo: false,

            },
            updateLoading: false,

        }

        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        api.get_course().then((response) => {
            this.setState({
                courseDropdown: response['data']
            })
        })
        api.get_student_update().then((response) => {
            this.setState({
                matrixNoDropdown: response['data']
            })
        })
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: event.target.value,
            invalid: {...this.state.invalid, [name]: false},
            notChanged: false,
            updateLoading: false
        });
    }

    validateUpdate = () => {

        let valid = true
        if (!this.state.course || !this.state.matrixNo) {
            valid = false
        }

        if (valid === false) {
            this.setState({
                invalid: {
                    course: this.state.course === '' ,
                    matrixNo: this.state.matrixNo === '',

                }
            });
        }

        return valid
    }

    updateUser() {

        let valid = this.validateUpdate()
        // let valid = Object.values(this.state.invalid).every((i) => i === true)


        if (valid  ) {
            this.setState({updateLoading: true})
            let params = {

                'id': this.state.existingData['id'],

                "course": this.state.course? this.state.course : this.state.existingData['course'],
                "matrixNo": this.state.matrixNo? this.state.matrixNo : this.state.existingData['matrixNo'],
                "grade": this.state.grade? this.state.grade : this.state.existingData['grade'],


            }
            params = JSON.stringify(params)
            params = window.btoa(params)
            api.update_(params).then(() => this.props.handleUpdate()).catch((err) => {
                this.props.handleUpdate(err)
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
            <Modal centered={true} size='x' isOpen={true} backdrop={true}>
                <ModalHeader>Update Student Course</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.submit}>

                        <Row style={{padding: "10px 20px 10px 20px"}}>
                            <Col md={4}>
                                <Label style={{marginTop: "5px", width: "100%"}}>Register Course</Label>
                            </Col>
                            <Col md={8}>
                                <FormGroup>

                                    <Input invalid={this.state.invalid.course} type={'select'} name="course"
                                           value={this.state.course} onChange={this.handleChange}>
                                        <option key={'section'} value={''} disabled>Please select</option>
                                        {

                                            this.state.courseDropdown.map((v, i) => {
                                                return <option key={v.id} value={v.id}>{v.name}</option>
                                            })
                                        }
                                    </Input>

                                    <FormFeedback>Fill in the required field</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row style={{padding: "10px 20px 10px 20px"}}>
                            <Col md={4}>
                                <Label style={{marginTop: "5px", width: "100%"}}>Student</Label>
                            </Col>
                            <Col md={8}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.matrixNo} type={'select'} name="matrixNo" disabled
                                           value={this.state.matrixNo} onChange={this.handleChange}>
                                        <option key={'matrixNo'} value={''} disabled>Please select</option>
                                        {

                                            this.state.matrixNoDropdown.map((v, i) => {
                                                return <option key={v.id} value={v.id}>{v.matrixNo} - {v.studentName}</option>
                                            })
                                        }
                                    </Input>
                                    <FormFeedback>Fill in the required field</FormFeedback>
                                </FormGroup>
                            </Col>

                        </Row>

                        {/*<Row style={{padding: "10px 20px 10px 20px"}}>*/}
                        {/*    <Col md={4}>*/}
                        {/*        <Label style={{marginTop: "5px", width: "100%"}}>Grade</Label>*/}
                        {/*    </Col>*/}
                        {/*    <Col md={8}>*/}
                        {/*        <FormGroup>*/}
                        {/*            <Input invalid={this.state.invalid.grade} type={'select'} name="grade"*/}
                        {/*                   value={this.state.grade} onChange={this.handleChange}>*/}
                        {/*                <option key={'grade'} value={''} disabled>Please select</option>*/}
                        {/*                {*/}

                        {/*                    ['A','A-','B','B-','C+','C','C-','D','D-','E',].map((v, i) => {*/}
                        {/*                        return <option key={v} value={v}>{v}</option>*/}
                        {/*                    })*/}
                        {/*                }*/}
                        {/*            </Input>*/}
                        {/*            <FormFeedback>Fill in the required field</FormFeedback>*/}
                        {/*        </FormGroup>*/}
                        {/*    </Col>*/}

                        {/*</Row>*/}
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <LaddaButton style={{width: '140px'}} className="mr-2 btn btn-shadow btn-primary"
                                 loading={this.state.updateLoading}
                                 disabled={this.state.notChanged}
                                 onClick={() => this.updateUser()} data-style={EXPAND_LEFT}
                    >Update
                    </LaddaButton>

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
