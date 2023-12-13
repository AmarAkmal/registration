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

            name: '',
            code: '',
            invalid: {
                name: false,
                code: false,


            },
            submitLoading: false,
            notChanged: true
        }

        this.handleChange = this.handleChange.bind(this);

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
        if (!this.state.name || !this.state.code) {
            valid = false
        }

        if (valid === false) {
            this.setState({
                invalid: {
                    name: this.state.name === '' ,
                    code: this.state.code === '',

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
                "code": this.state.code,
                "name": this.state.name,

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

            <Modal centered={true} isOpen={true} size='x' backdrop={true}>
                <ModalHeader>Register Program</ModalHeader>
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
