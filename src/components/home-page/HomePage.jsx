import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import EmployeeService from '../../services/EmployeePayrollService';
import EmployeeTable from './EmployeeTable';
import addIcon from '../../assets/icons/add-24px.svg'
import './HomePage.scss';
import logo from '../../assets/images/logo.png'

var employeeService = new EmployeeService();


class HomePage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            employeeArray: []

        }
    }

    getEmployee = () => {

        employeeService.getAllEmployee().then(obj => {
            this.setState({ employeeArray: obj.data })
        })
            .catch(err => {
                this.setState({ employeeArray: [] })

            })

    }


    openSearch() {

    }
    search() {

    }

    render() {
        return (

            <div onLoad={this.getEmployee}>
                <header className='header row center'>
                <div className="logo">
                    <Link to="/">
                        <img className = "emp-logo" src={logo} alt="" /></Link>
                    <div className = "emp-texts">
                        <span className="emp-text">EMPLOYEE</span> <br />
                        <span className="emp-text emp-payroll">PAYROLL</span>
                    </div>
                </div>

            </header>
                <div className="main-content">
                    <div className="header-content">
                        <div className="emp-detail-text">
                            Employee Details <div className="emp-count"></div>
                        </div>
                        <div className="row center button box">
                            <Link to="payroll-form" className="add-button flex-row-center">
                                <img src={addIcon} alt="" />Add User
                            </Link>
                        </div>
                    </div>
                    <div className="table-main" >
                        <EmployeeTable employeeArray={this.state.employeeArray} />
                    </div>
                </div>
            </div>
        )

    }

}

export default HomePage