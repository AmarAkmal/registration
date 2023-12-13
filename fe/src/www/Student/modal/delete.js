import React from "react";
import {
    Button,
    Col,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    FormFeedback,
    Form
} from "reactstrap";

import { Bounce, toast } from "react-toastify";
import { Combobox, DropdownList } from "react-widgets";
import api from "../api"
import { isConstructorDeclaration } from "typescript";
import LaddaButton, {EXPAND_LEFT} from "react-ladda";
import {decode as base64_decode, encode as base64_encode} from 'base-64';

export default class ModalDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }
    toastView(msg, typeToast) {
        toast(msg, {
            transition: Bounce,
            closeButton: true,
            autoClose: 5000,
            position: 'top-right',
            type: typeToast
        });
    }
    deleteUser = () => {
        let params = {
            'id': this.props.id,
        }
        params = JSON.stringify(params)
        params = window.btoa(params)
        api.delete_(params).then(res => {
            if (res.data.message == 'Failed to delete, Record in use'){
                this.toastView( res.data.message, 'warning')
            }else {
                this.props.handleDelete()
            }

        }).catch((err) => {
            this.props.handleDelete(err);
        });
    }

    render() {
        return (<>

            <Modal centered={true} size='md' isOpen={true} backdrop={true}>
                <ModalHeader>Confirmation</ModalHeader>
                <ModalBody>

                    <p>Are you sure you want to delete?</p>
                </ModalBody>
                <ModalFooter style={{display:"block"}}>
                    <Row>

                        <Col md="6">
                            {/*<Button style={{ width: '100%' }} color="success"*/}
                            {/*        className='mr-2 btn-icon btn-shadow btn-danger'*/}
                            {/*        onClick={() => {*/}
                            {/*            this.submit()*/}
                            {/*        }}*/}
                            {/*><i*/}
                            {/*    className="lnr-cloud-upload btn-icon-wrapper"> </i>Delete*/}
                            {/*</Button>*/}
                            <LaddaButton style={{ width: '100%' }} className="mr-2 btn btn-shadow btn-danger"
                                         loading={this.state.isLoading}
                                         onClick={() => this.deleteUser()} data-style={EXPAND_LEFT}
                            >
                                Delete
                            </LaddaButton>
                        </Col>
                        <Col md="6">
                            <Button style={{ width: '100%' }}
                                    className='mr-2 btn-icon btn-shadow btn-secondary'
                                    onClick={() => {

                                        this.props.onToggleDelete();
                                    }}
                            >
                                Cancel
                            </Button>
                        </Col>
                    </Row>

                </ModalFooter>
            </Modal>
        </>)
    }

}
