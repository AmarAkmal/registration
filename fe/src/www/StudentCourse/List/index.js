import React, {Fragment} from "react";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col, FormFeedback,
    FormGroup, Input,
    Label,
    Row,
    UncontrolledTooltip
} from "reactstrap";

import PageTitle from "../../../Layout/AppMain/PageTitle";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEraser, faPencil, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import ModalAdd from "../modal/add";
import ModalUpdate from "../modal/update";
import ModalDelete from "../modal/delete";
import api from "../api"
import {Bounce, toast} from "react-toastify";
import ReactTable from "react-table";
import "../style.css";
import {Redirect} from "react-router-dom";
import {decode as base64_decode} from 'base-64';

function toastView(msg, typeToast) {
    toast(msg, {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: 'top-right',
        type: typeToast
    });
}

export default class StudentCourseList extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            isAdd: false,
            isUpdate: false,
            courseDropdown :[],
            course :"",
            dataDetails: {

                'departmentName': "",

            },
            history: [],
            deleteConfirmation: false,
            userId: null,
            pending: false,
            isAdmin: [ 'Admin'].includes(base64_decode(localStorage.getItem('3leeb6bnmn'))),
            searching: false,
            page: 0,
            pageSize: 10,
            totalpagenum: 1,
            filtered: [],
            filterAccount: "",
            filterAgency: "",

            sorting: [{id: "name", desc: false}]
        };
    }

    componentDidMount = () => {
        api.get_course().then((response) => {
            this.setState({
                courseDropdown: response['data']
            })
        })
        // this.loadData()
        this.addFilterPlaceholder()
    }

    toggleAdd() {
        this.setState({
            isAdd: !this.state.isAdd
        })
    }

    toggleUpdate() {
        this.setState({
            isUpdate: !this.state.isUpdate
        })
    }

    toggleDelete() {
        this.setState({
            deleteConfirmation: !this.state.deleteConfirmation
        })
    }

    loadDataRefresh = () => {

        this.loadData();
    }

    loadData = () => {
        let logger_id = {
            'page': this.state.page,
            'pageSize': this.state.pageSize,
            'filtered': this.state.filtered,
            'sorted': this.state.sorting,
            'course': this.state.course
        }
        logger_id = JSON.stringify(logger_id)
        logger_id = window.btoa(logger_id)

        api.list_(logger_id).then((response) => {
            this.setState({
                data: response['data'],
                pending: false,
                searching: false,
                totalpagenum: response['totalpagenum'],
            })
        }).catch((err) => {
            console.log(err);
            this.setState({pending: false})
        })
    };

    handelAdd = (err = null) => {
        this.setState({isAdd: false});
        this.loadData()
        if (err === null) {
            toastView("Data added succesfully", 'success')
        }
    }

    handleUpdate = (err = null) => {

        if (err === null) {
            this.setState({isUpdate: false});
            this.loadData()
            toastView("Data updated succesfully", 'success')
        }
    }

    handleDelete = (err = null) => {
        this.setState({deleteConfirmation: false});
        this.loadData()
        if (err === null) {
            toastView("Data deleted succesfully", 'success')
        }
    }

    confUpdateModal = (val) => {
        this.setState({
            dataDetails: {
                'id': val['id'],
                'course': val['course_id'],
                'matrixNo': val["student_id"],
                'grade': val["grade"],

            }, isUpdate: true
        });
    }

    addFilterPlaceholder = () => {
        const filters = document.querySelectorAll("div.rt-th > input");
        for (let filter of filters) {
            filter.placeholder = "Type here";
        }
    }
    handleChange=(event)=> {
        const target = event.target;
        const name = target.name;
        this.setState(
            {
                [name]: event.target.value,
                invalid: {...this.state.invalid, [name]: false},

            }
        );

    }
    render() {
        const {data} = this.state;

        if (!localStorage.getItem('3leeb6bnmn')) {
            return (<Redirect push to={'/login'}/>)
        }

        const columns = [
            {
                Header: "No.",
                sortable: false,
                filterable: false,
                width: 55,
                Cell: (row) => (
                    <span
                        style={{
                            textAlign: 'center',
                            width: '100%'
                        }}>
                        {row.index + 1}</span>
                ),
            },
            {
                Header: "Code Course",
                accessor: 'course',
                Cell: (row) => (
                    <span
                        style={{
                            textAlign: 'center',
                            width: '100%'
                        }}>{row.value}</span>
                ),
                filterable: true,
                width: 200
            },
            {
                Header: "Course Name",
                accessor: 'courseName',
                Cell: (row) => (
                    <span
                        style={{
                            textAlign: 'center',
                            width: '100%'
                        }}>{row.value}</span>
                ),
                width: 200
            },
            {
                Header: "Matrix No.",
                accessor: 'matrixNo',
                Cell: (row) => (
                    <span
                        style={{
                            textAlign: 'center',
                            width: '100%'
                        }}>{row.value}</span>
                ),
                filterable: true,
                width: 200
            },
            {
                Header: "Student Name",
                accessor: 'studentName',
                Cell: (row) => (
                    <span
                        style={{
                            textAlign: 'center',
                            width: '100%'
                        }}>{row.value}</span>
                ),
                filterable: true,
            },
            {
                Header: "Program Name",
                accessor: 'programName',
                Cell: (row) => (
                    <span
                        style={{
                            textAlign: 'center',
                            width: '100%'
                        }}>{row.value}</span>
                ),
                filterable: true,
            },

            {
                Header: "Action",
                accessor: '',
                sortable: false,
                show: this.state.isAdmin ,
                width: 140,
                Cell: (row) => (
                    <div style={{textAlign: 'center', width: '100%',}}>
                        <span>
                            <Button outline id={"edit-button" + row.index} className="mb-2 mr-2 border-0 btn-outline-2x"
                                    color="primary"
                                    onClick={() => this.confUpdateModal(row.original)}>
                                <FontAwesomeIcon className={'fa-lg'} icon={faPencil}/>
                            </Button>
                            <UncontrolledTooltip placement={"top"}
                                                 target={"edit-button" + row.index} trigger="hover">
                                Edit
                            </UncontrolledTooltip>
                        </span>
                        <span>
                            <Button outline id={"delete-button-" + row.index}
                                    className="mb-2 mr-2 border-0 btn-outline-2x" color="danger"
                                    onClick={() => this.setState({userId: row.original.id, deleteConfirmation: true})}>
                                <FontAwesomeIcon className={'fa-lg'} icon={faTrash}/>
                            </Button>
                            <UncontrolledTooltip placement={"top"}
                                                 target={"delete-button-" + row.index} trigger="hover">
                                Delete
                            </UncontrolledTooltip>
                        </span>

                    </div>
                ),
                filterable: true,
                Filter: () =>
                    <div style={{textAlign: 'center', width: '100%',}}>
                        <span>
                            <Button id="clear-button" className="mr-2 btn-icon btn-shadow btn-secondary"
                                    onClick={() => this.setState({
                                        filtered: [],
                                        filterAccount: '',
                                        filterAgency: '', pending: true
                                    }, this.loadData)}>
                                <FontAwesomeIcon className={'fa-lg'} icon={faEraser}/>&nbsp;&nbsp;Clear
                            </Button>
                            <UncontrolledTooltip placement={"top"}
                                                 target="clear-button" trigger="hover">
                                Clear Search
                            </UncontrolledTooltip>
                        </span>
                    </div>
            },
        ];

        return (

            <>

                {this.state.isAdd &&
                    <ModalAdd onToggle={() => this.toggleAdd()} onRefresh={() => this.loadDataRefresh()}
                              handleAdd={this.handelAdd} course={this.state.course}/>
                }

                {this.state.isUpdate &&
                    <ModalUpdate onToggle={() => this.toggleUpdate()} onRefresh={() => this.loadDataRefresh()}
                                 data={this.state.dataDetails}
                                 handleUpdate={this.handleUpdate}/>
                }
                {
                    this.state.deleteConfirmation &&
                    <ModalDelete onToggleDelete={() => this.toggleDelete()} onRefresh={() => this.loadData()}
                                 handleDelete={this.handleDelete}
                                 userId={this.state.userId}/>
                }
                <Fragment>
                    <TransitionGroup>
                        <CSSTransition component="div" classNames="TabsAnimation" appear={true}
                                       timeout={1500} enter={false} exit={false}>
                            <div>
                                <PageTitle
                                    heading="Student Course"
                                    breadcrumbTitle="Student / List of Student Course"
                                    subheading="Student List"
                                    icon="pe-7s-medal icon-gradient bg-tempting-azure"
                                />
                                <Row>
                                    <Col md="12">
                                        <Card className="main-card mb-3">

                                            <CardHeader className={'mt-3'} style={{display: "unset"}}>
                                                <Row>
                                                    <Col sm={6} md={6} lg={6}>
                                                        <CardTitle className='mt-2'>List of Student Course</CardTitle>
                                                    </Col>
                                                    <Col sm={1} md={1}
                                                         lg={(window.innerWidth >= 994 && window.innerWidth <= 1355) ? 2 : 3}
                                                         style={{marginRight: "7.5%"}}>
                                                    </Col>

                                                    {/*<Col sm={4} md={4}*/}
                                                    {/*     lg={(window.innerWidth >= 994 && window.innerWidth <= 1355) ? 3 : 2}*/}
                                                    {/*     style={{padding: '0px', paddingRight: '10px'}}>*/}
                                                    {/*    {this.state.isAdmin &&*/}
                                                    {/*        <div style={{width: '100%', textAlign: 'right'}}>*/}
                                                    {/*            <Button outline className="mb-2 mr-2 btn-outline-2x"*/}
                                                    {/*                    style={{width: '100%'}} color="primary"*/}
                                                    {/*                    onClick={() => {*/}
                                                    {/*                        this.setState({isAdd: true});*/}
                                                    {/*                    }}*/}
                                                    {/*            >*/}
                                                    {/*                <FontAwesomeIcon className={'fa-lg'}*/}
                                                    {/*                                 icon={faPlus}/> &nbsp;&nbsp;Show List*/}
                                                    {/*                Course of Student*/}

                                                    {/*            </Button>*/}
                                                    {/*        </div>*/}
                                                    {/*    }*/}
                                                    {/*</Col>*/}
                                                </Row>
                                            </CardHeader>


                                            <CardBody>
                                                <Row  >
                                                    <Col md={1}>
                                                        <Label   className=" mt-3 " style={{marginTop: "7px", width: "100%"}}>Course</Label>
                                                    </Col>
                                                    <Col md={2}>
                                                        <FormGroup >

                                                            <Input type={'select'} name="course"  className=" m-2 "
                                                                   value={this.state.course}  onChange={this.handleChange}>
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
                                                    <Col md={5}>
                                                        <Button outline className=" m-2  btn-outline-2x"
                                                                color="primary"
                                                                onClick={() => {
                                                                    this.loadData();
                                                                }}
                                                        >
                                                            <FontAwesomeIcon className={'fa-lg'}
                                                                             icon={faPlus}/> &nbsp;&nbsp;Show List

                                                        </Button>
                                                        {this.state.isAdmin && <Button outline className=" btn-outline-2x" disabled={!this.state.course}
                                                                                       color="primary"
                                                                                       onClick={() => {
                                                                                           this.setState({isAdd: true});
                                                                                       }}
                                                        >
                                                            <FontAwesomeIcon className={'fa-lg'}
                                                                             icon={faPlus}/> &nbsp;&nbsp;Register

                                                        </Button>}

                                                    </Col>

                                                </Row>
                                                <ReactTable
                                                    filtered={this.state.filtered}
                                                    data={data}
                                                    showPagination={true}
                                                    manual
                                                    page={this.state.page}
                                                    columns={columns}
                                                    loading={this.state.pending}
                                                    onPageChange={(pageIndex) => {
                                                        this.setState({page: pageIndex}, () => {
                                                            this.loadData();
                                                        })

                                                    }}
                                                    onPageSizeChange={(pageSize, pageIndex) => {
                                                        this.setState({page: pageIndex, pageSize: pageSize}, () => {
                                                            this.loadData();
                                                        })
                                                    }}
                                                    onFilteredChange={(filtered, column) => {
                                                        this.setState({
                                                            page: 0, filtered: filtered,
                                                            searching: true, pending: true
                                                        }, () => {
                                                            if (this.timeout) clearTimeout(this.timeout);
                                                            this.timeout = setTimeout(() => {
                                                                this.loadData();
                                                            }, 700);

                                                        })
                                                    }}
                                                    onSortedChange={(newSorted, column, shiftKey) => {
                                                        this.setState({sorting: newSorted}, () => {
                                                            this.loadData()
                                                        })
                                                    }}
                                                    pages={this.state.totalpagenum}
                                                    defaultSorted={this.state.sorting}
                                                    pageSize={this.state.pageSize}
                                                    defaultPageSize={10}
                                                    className="-striped -highlight"
                                                />
                                            </CardBody>

                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </Fragment>
            </>
        );
    }
}
