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
            courseDropdown :[],
            matrixNoDropdown :[],
            course: '',
            matrixNo: '',
            studentName: '',
            grade: '',

            invalid: {
                course: false,
                matrixNo: false,


            },
            submitLoading: false,
            notChanged: true
        }

        this.handleChange = this.handleChange.bind(this);

    }
    componentDidMount() {
        api.get_course().then((response) => {
            this.setState({
                courseDropdown: response['data']
            })
        })
        api.get_student().then((response) => {
            this.setState({
                matrixNoDropdown: response['data']
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

    handleOnChange() {
        this.setState({notChanged: true})
    }

    submit() {
        let valid = this.validateSubmit()

        // let valid = Object.values(this.state.invalid).every((i) => i === true)
        if (valid) {
            this.setState({submitLoading: true})
            let params = {
                "course": this.state.course,
                "matrixNo": this.state.matrixNo,
                "grade": this.state.grade,

            }

            params = JSON.stringify(params)
            params = window.btoa(params)
            api.add(params).then(e => {

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

            <Modal centered={true} isOpen={true} size='l' backdrop={true}>
                <ModalHeader>Register Course of Student</ModalHeader>
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
                                <Label style={{marginTop: "5px", width: "100%"}}>Student Name</Label>
                            </Col>
                            <Col md={8}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.matrixNo} type={'select'} name="matrixNo"
                                           value={this.state.matrixNo} onChange={this.handleChange}>
                                        <option key={'matrixNo'} value={''} disabled>Please select</option>
                                        {

                                            this.state.matrixNoDropdown.map((v, i) => {
                                                return <option key={v.id} value={v.id}> {v.studentName}-{v.matrixNo} </option>
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
                        // loading={this.state.submitLoading}
                        //  disabled={this.state.notChanged}
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
