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
    InputGroup,
    FormFeedback,
    Form, InputGroupText
} from "reactstrap";
import { Progress } from "react-sweet-progress";
import { Loader } from "react-loaders";
import LoadingOverlay from "react-loading-overlay-ts";
import "./ProgressSpinnerStyles.css";

export default class ProgressSpinner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }


    }


    render() {

        const theme =
            {
                error: {
                    symbol: this.props.progressValue + '%',
                    trailColor: 'red',
                    color: 'red'
                },
                default: {
                    symbol: this.props.progressValue + '%',
                    trailColor: '#efefef',
                    color: '#545cd8'
                },
                active: {
                    symbol: this.props.progressValue + '%',
                    trailColor: '#efefef',
                    color: '#545cd8'
                },
                success: {
                    symbol: this.props.progressValue + '%',
                    trailColor: '#3ac47d',
                    color: '#3ac47d'
                }
            }


        return (<>
            <Modal style={{marginTop:"0"}}  centered={true}  isOpen={this.props.progressState}>
                        <LoadingOverlay tag="div" active={this.props.progressState}
                                        styles={{
                                            overlay: (base) => ({
                                                ...base,
                                                background: "#fff",
                                                // opacity: 0.5,
                                                fontWeight: 500,
                                            }),
                                        }}
                                        spinner={
                                            <Progress percent={this.props.progressValue} theme={theme}
                                                      type="circle" width={100} strokeWidth={10}/>}>

                        </LoadingOverlay>
                    </Modal>

        </>)
    }

}
