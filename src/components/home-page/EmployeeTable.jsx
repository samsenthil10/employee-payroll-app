import React from "react";
import deleteIcon from '../../assets/icons/delete-black-18dp.svg'
import editIcon from '../../assets/icons/create-black-18dp.svg'
import profile1 from '../../assets/profile-images/Ellipse -1.png';
import profile2 from '../../assets/profile-images/Ellipse -3.png';
import profile3 from '../../assets/profile-images/Ellipse -7.png';
import profile4 from '../../assets/profile-images/Ellipse -8.png';
import './HomePage.scss';
import { Link } from "react-router-dom";
import EmployeePayrollService from "../../services/EmployeePayrollService";

const Display = (props) => {

    var prof;

    const remove = (id) => {
        const employeeService = new EmployeePayrollService()
        var status = window.confirm("Are you sure you want to delete?")
        if (status === true) {
            employeeService.deleteEmployee(id)
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

    return (

        <table id="display" className="table">
            <tbody>
                <tr key={-1}>
                    <th></th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>Start Date</th>
                    <th>Actions</th>"

                </tr>
                {
                    props.employeeArray && props.employeeArray.map((element, ind) => (
                        <tr key={ind}>
                            <td><img className="profile" onLoad={getProfile(element.profilePic)} src={prof} alt="" /></td>
                            <td>{element.name}</td>
                            <td>{element.gender}</td>
                            <td><div className="depts">
                                {element.departments && element.departments.map(dept => (
                                    <div className="dept-label">{dept}</div>
                                ))}
                            </div></td>
                            <td>{element.salary}</td>
                            <td>
                                {(new Date(element.startDate)).toLocaleDateString('en-GB', {
                                    day: 'numeric', month: 'short', year: 'numeric'
                                })}
                            </td>
                            <td>
                                <img onClick={() => remove(element.employeeId)} src={deleteIcon} alt="delete" />
                                <Link to={`/payroll-form/${element.employeeId}`} > <img src={editIcon} alt="edit" /> </Link>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>


    )
}

export default Display