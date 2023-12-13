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
            name: this.props.data.name,
            code: this.props.data.code,
            invalid: {

                name: false,
                code: false,


            },
            updateLoading: false,

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

        if ( !this.state.name  || !this.state.code  ) {

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

    updateUser() {

        let valid = this.validateUpdate()
        // let valid = Object.values(this.state.invalid).every((i) => i === true)


        if (valid  ) {
            this.setState({updateLoading: true})
            let params = {

                'id': this.state.existingData['id'],
                "code": this.state.code ? this.state.code : this.state.existingData['code'],
                "name": this.state.name ? this.state.name : this.state.existingData['name'],


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
                <ModalHeader>Update Faculty</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.submit}>

                        <Row style={{padding: "10px 20px 10px 20px"}}>
                            <Col md={2}>
                                <Label style={{marginTop: "5px", width: "100%"}}>Code</Label>
                            </Col>
                            <Col md={10}>
                                <FormGroup>
                                    <Input invalid={this.state.invalid.code }
                                           required={true} type="text" name="code" id="code"
                                            defaultValue={this.state.code}
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
