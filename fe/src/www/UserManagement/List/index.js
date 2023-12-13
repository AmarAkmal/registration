import React, {Fragment} from "react";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {Button, Card, CardBody, CardHeader, CardTitle, Col, Row, UncontrolledTooltip} from "reactstrap";

import PageTitle from "../../../Layout/AppMain/PageTitle";
import {DropdownList} from "react-widgets";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEraser, faPencil, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import ModalAdd from "../modal/add";
import ModalUpdate from "../modal/update";
import ModalDelete from "../modal/delete";
import api from "../api"
import {Bounce, toast} from "react-toastify";
import ReactTable from "react-table";
import "../userManagementStyle.css";
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

export default class UserManagementList extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            isAdd: false,
            isUpdate: false,
            dataUser: {
                'username': "",
                'password': "",
                'staffName': "",
                'email': "",
                'accountType': "",
                'agency': "",
            },
            history: [],
            deleteConfirmation: false,
            userId: null,
            pending: true,
            isAdmin: ['Super Admin'].includes(base64_decode(localStorage.getItem('3leeb6bnmn'))),
            searching: false,
            page: 0,
            pageSize: 10,
            totalpagenum: 1,
            filtered: [],
            filterAccount: "",
            accountTypeDropdown: [
                {id: 'Normal', value: 'Normal'},
                {id: 'Admin', value: 'Admin'},
            ],
            sorting: [{id: "staff_name", desc: false}]
        };
    }

    componentDidMount = () => {
        this.loadData()
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
            'sorted': this.state.sorting
        }
        logger_id = JSON.stringify(logger_id)
        logger_id = window.btoa(logger_id)

        api.list_user_profile(logger_id).then((response) => {
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
            this.state.isAdmin ?
                toastView("User added succesfully", 'success')
                :
                toastView("Not Authorized", 'error')
        }
    }

    handleUpdate = (err = null) => {
        this.setState({isUpdate: false});
        this.loadData()
        if (err === null) {
            toastView("Data updated succesfully", 'success')
        }
    }

    handleDelete = (err = null) => {
        this.setState({deleteConfirmation: false});
        this.loadData()
        if (err === null) {
            this.state.isAdmin ?
                toastView("User deleted succesfully", 'success')
                :
                toastView("Not Authorized", 'error')
        }
    }

    confUpdateModal = (val) => {
        this.setState({
            dataUser: {
                'id': val['id'],
                'user_id': val['user_id'],
                'username': val["name"],
                'phoneNo': val["phone"],
                'department': val["department_id"],
                // 'password': "XxXxXxXxX",
                'staffName': val['staff_name'],
                'departmentId': val['department_id'],
                'email': val['email'],
                'accountType': val['user_type'],
                'agency': val['agency'],
            }, isUpdate: true
        });
    }

    addFilterPlaceholder = () => {
        const filters = document.querySelectorAll("div.rt-th > input");
        for (let filter of filters) {
            filter.placeholder = "Type here";
        }
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
                Header: "User Id",
                accessor: 'user_id',
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
                Header: "Staff Name",
                accessor: 'name',
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
                Header: "Email",
                accessor: 'email',
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
                Header: "Faculty",
                accessor: 'department',
                Cell: (row) => (
                    <span
                        style={{
                            textAlign: 'center',
                            width: '100%'
                        }}>{row.value}</span>
                ),
                filterable: true,
                // Filter: ({filter, onChange}) =>
                //     <DropdownList
                //         name={'agency'}
                //         // placeholder="Account Type"
                //         value={this.state.filterAgency}
                //         filter={false}
                //         busy={this.state.searching}
                //         dataKey="id"
                //         textField="value"
                //         data={this.state.agencyDropdown.sort()}
                //         onChange={(e) => {
                //             this.setState({filterAgency: e.value})
                //             onChange(e.value)
                //         }}
                //         placeholder={'Please select'}
                //         className={"text-start fw-normal"}
                //     />
            },
            {
                Header: "Account Type",
                accessor: 'account_type',
                Cell: (row) => (
                    <span
                        style={{
                            textAlign: 'center',
                            width: '100%',
                        }}>
                        <Button className={ (['Super Admin','Admin'].includes(row.value)) ? "bg-success border-0" : "bg-secondary border-0"}
                                disabled>
                            {row.value}
                        </Button>
                    </span>
                ),
                filterable: true,
                Filter: ({filter, onChange}) =>
                    <DropdownList
                        name={'accounttype'}
                        // placeholder="Account Type"
                        value={this.state.filterAccount}
                        filter={false}
                        busy={this.state.searching}
                        dataKey="id"
                        textField="value"
                        data={this.state.accountTypeDropdown.sort()}
                        onChange={(e) => {
                            this.setState({filterAccount: e.value})
                            onChange(e.value)
                        }}
                        placeholder={'Please select'}
                        className={"text-start fw-normal"}
                    />
            },
            {
                Header: "Action",
                accessor: '',
                sortable: false,
                width: 140,
                show: this.state.isAdmin,
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
                                Edit User
                            </UncontrolledTooltip>
                        </span>
                        {base64_decode(localStorage.getItem('3leeb6bnmn')) == "Admin" && base64_decode(localStorage.getItem('lkmlu5b2gf')) != row.original.id &&
                            <span>
                            <Button outline id={"delete-button-" + row.index}
                                    className="mb-2 mr-2 border-0 btn-outline-2x" color="danger"
                                    onClick={() => this.setState({userId: row.original.id, deleteConfirmation: true})}>
                                <FontAwesomeIcon className={'fa-lg'} icon={faTrash}/>
                            </Button>
                            <UncontrolledTooltip placement={"top"}
                                                 target={"delete-button-" + row.index} trigger="hover">
                                Delete User
                            </UncontrolledTooltip>
                        </span>}

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
                              handleAdd={this.handelAdd}/>
                }

                {this.state.isUpdate &&
                    <ModalUpdate onToggle={() => this.toggleUpdate()} onRefresh={() => this.loadDataRefresh()}
                                 dataUser={this.state.dataUser}
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
                                    heading="User Management"
                                    breadcrumbTitle="User Management / List of User Management"
                                    subheading="User Management List"
                                    icon="pe-7s-medal icon-gradient bg-tempting-azure"
                                />
                                <Row>
                                    <Col md="12">
                                        <Card className="main-card mb-3">

                                            <CardHeader className={'mt-3'} style={{display: "unset"}}>
                                                <Row>
                                                    <Col sm={6} md={6} lg={6}>
                                                        <CardTitle className='mt-2'>List of User Management</CardTitle>
                                                    </Col>
                                                    <Col sm={1} md={1}
                                                         lg={(window.innerWidth >= 994 && window.innerWidth <= 1355) ? 2 : 3}
                                                         style={{marginRight: "7.5%"}}>
                                                    </Col>

                                                    <Col sm={4} md={4}
                                                         lg={(window.innerWidth >= 994 && window.innerWidth <= 1355) ? 3 : 2}
                                                         style={{padding: '0px', paddingRight: '10px'}}>
                                                        {this.state.isAdmin &&
                                                            <div style={{width: '100%', textAlign: 'right'}}>
                                                                <Button outline className="mb-2 mr-2 btn-outline-2x"
                                                                        style={{width: '100%'}} color="primary"
                                                                        onClick={() => {
                                                                            this.setState({isAdd: true});
                                                                        }}
                                                                >
                                                                    <FontAwesomeIcon className={'fa-lg'}
                                                                                     icon={faPlus}/> &nbsp;&nbsp;Register
                                                                    New User

                                                                </Button>
                                                            </div>
                                                        }
                                                    </Col>
                                                </Row>
                                            </CardHeader>
                                            <CardBody>
                                                {/* <DataTable data={data}
                                                        columns={columns}
                                                        pagination
                                                        fixedHeader
                                                        fixedHeaderScrollHeight="400px"
                                                        responsive={true}
                                                        progressPending={this.state.pending}
                                                /> */}
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
