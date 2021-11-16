import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import EmployeePayrollService from '../../services/EmployeePayrollService';
import addIcon from '../../assets/icons/add-24px.svg'
import searchIcon from '../../assets/icons/Search.png'
import './HomePage.scss';
import editIcon from '../../assets/icons/create-black-18dp.svg'
import deleteIcon from '../../assets/icons/delete-black-18dp.svg'
import logo from '../../assets/images/logo.png'
import profile1 from '../../assets/profile-images/Ellipse -1.png';
import profile2 from '../../assets/profile-images/Ellipse -3.png';
import profile3 from '../../assets/profile-images/Ellipse -7.png';
import profile4 from '../../assets/profile-images/Ellipse -8.png';

var employeeService = new EmployeePayrollService();


const HomePage = (props) => {

    var prof;

    const [employees, setEmployees] = useState([])
    const [textInput, setTextInput] = useState("");

    const setSearchQuery = (event) => {

        var departmentToSearch = event.target.value;
        setTextInput({ textInput, departmentToSearch })
    }

    useEffect(() => {
        getAllEmployees();
    }, [])

    const getAllEmployees = () => {
        employeeService.getAllEmployee().then((response) => {
            setEmployees(response.data.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteEmployee = (employeeId) => {
        const employeeService = new EmployeePayrollService()
        var status = window.confirm("Are you sure you want to delete?")
        if (status === true) {
            employeeService.deleteEmployee(employeeId)
            window.location.reload()
        }
        else
            window.location.reload()

    }

    const getProfile = (profilePic) => {

        if (profilePic === '../../assets/profile-images/Ellipse -1.png')
            prof = profile1;
        else if (profilePic === '../../assets/profile-images/Ellipse -3.png')
            prof = profile2;
        else if (profilePic === '../../assets/profile-images/Ellipse -7.png')
            prof = profile3;
        else if (profilePic === '../../assets/profile-images/Ellipse -8.png')
            prof = profile4;
    }

    const searchByDepartment = () => {
        employeeService.getAllEmployeeByDepartment(textInput.departmentToSearch).then((response) => {
            setEmployees(response.data.data);

        }).catch(error => {
            console.log(error);
        })
    }

    return (

        <div >
            <header className="header row center">

                <div className="logo">
                    <img src={logo} alt="" />
                    <div>
                        <span className="emp-text">EMPLOYEE</span><br />
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

                        <input className="input"
                            onChange={setSearchQuery} type="input" placeholder="" value={textInput.value} placeholder="Enter Department name" />


                        <img className="search-icon" src={searchIcon} onClick={searchByDepartment} alt="" />

                        <Link to="payroll-form" className="add-button flex-row-center">
                            <img src={addIcon} alt="" />Add User
                        </Link>
                    </div>
                </div>
                <div className="table-main" >
                    <table id="display" className="table">
                        <tbody>
                            <tr key={-1}>
                                <th></th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Department</th>
                                <th>Salary</th>
                                <th>Start Date</th>
                                <th>Actions</th>

                            </tr>
                            {
                                employees && employees.map((employee, ind) => (
                                    <tr key={ind}>
                                        <td><img className="profile" onLoad={getProfile(employee.profilePic)} src={prof} alt="" /></td>
                                        <td>{employee.name}</td>
                                        <td>{employee.gender}</td>
                                        <td><div className="depts">
                                            {employee.departments && employee.departments.map(dept => (
                                                <div className="dept-label">{dept}</div>
                                            ))}
                                        </div></td>
                                        <td> {'\u20B9'}{employee.salary}</td>
                                        <td>{(new Date(employee.startDate)).toLocaleDateString('en-GB', {
                                            day: 'numeric', month: 'short', year: 'numeric'
                                        })}</td>
                                        <td>
                                            <Link className="btn btn-info"
                                                to={`/payroll-form/${employee.employeeId}`} >

                                                <img src={editIcon} alt="edit" />

                                            </Link>
                                            <img onClick={() => deleteEmployee(employee.employeeId)} src={deleteIcon} alt="delete" />

                                        </td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}



export default HomePage