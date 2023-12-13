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
            accountTypeDropdown: ['Normal', 'Admin'],
            existingData: this.props.data,
            kod: this.props.data.kod,
            name: this.props.data.name,
            quantity: this.props.data.quantity,
            invalid: {
                kod: false,
                name: false,
                quantity: false,

            },
            updateLoading: false,
            invalidEmail: false,
            listUsername: [],

        }

        this.handleChange = this.handleChange.bind(this);

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

        if (!this.state.kod || !this.state.name || !this.state.quantity ) {

            valid = false
        }


        if (valid === false) {
            this.setState({
                invalid: {
                    kod: this.state.kod === '' ? true : false,
                    name: this.state.name === '' ? true : false,
                    quantity: this.state.quantity === '' ? true : false,

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


        return valid
    }

    updateUser() {

        let valid = this.validateUpdate()
        // let valid = Object.values(this.state.invalid).every((i) => i === true)


        if (valid  ) {
            this.setState({updateLoading: true})
            let params = {

                'id': this.state.existingData['id'],
                "kod": this.state.kod ? this.state.kod : this.state.existingData['kod'],
                "name": this.state.name ? this.state.name : this.state.existingData['name'],
                "quantity": this.state.quantity ? this.state.quantity : this.state.existingData['quantity'],

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
            <Modal centered={true} size='lg' isOpen={true} backdrop={true}>
                <ModalHeader>Update Record</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.submit}>
                        <Row style={{padding: "10px 20px 10px 20px"}}>
                            <Col md={2}>
                                <Label style={{marginTop: "5px", width: "100%"}}>Code</Label>
                            </Col>
                            <Col md={10}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.kod}
                                           required={true} type="text" name="kod" id="kod"
                                            defaultValue={this.state.kod}
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
                                    <Input invalid={this.state.invalid.name }
                                           required={true} type="text" name="name" id="name"
                                            defaultValue={this.state.name}
                                           onChange={this.handleChange}/>
                                    <FormFeedback>Fill in the required field</FormFeedback>
                                </FormGroup>
                            </Col>

                        </Row>
                        <Row style={{padding: "10px 20px 10px 20px"}}>
                            <Col md={2}>
                                <Label style={{marginTop: "5px", width: "100%"}}>Quantity</Label>
                            </Col>
                            <Col md={10}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.quantity }
                                           required={true} type="number" name="quantity" id="quantity"
                                            defaultValue={this.state.quantity}
                                           onChange={this.handleChange}/>
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
