import React from "react";
import deleteIcon from '../../assets/icons/delete-black-18dp.svg'
import editIcon from '../../assets/icons/create-black-18dp.svg'
import profile1 from '../../assets/profile-images/Ellipse -1.png';
import profile2 from '../../assets/profile-images/Ellipse -3.png';
import profile3 from '../../assets/profile-images/Ellipse -7.png';
import profile4 from '../../assets/profile-images/Ellipse -8.png';
import './HomePage.scss';

const Display = (props) => {

    var prof;

    const remove = (id) => {
        console.log("remove")
    }

    const update = (id) => {
        console.log("update")


    }

    const getProfile = (profileUrl) => {

        if (profileUrl === '../../assets/profile-images/Ellipse -1.png')
            prof = profile1;
        else if (profileUrl === '../../assets/profile-images/Ellipse -3.png')
            prof = profile2;
        else if (profileUrl === '../../assets/profile-images/Ellipse -7.png')
            prof = profile3;
        else if (profileUrl === '../../assets/profile-images/Ellipse -8.png')
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
                            <td><img className="profile" onLoad={getProfile(element.profileUrl)} src={prof} alt="" /></td>
                            <td>{element.name}</td>
                            <td>{element.gender}</td>
                            <td><div className="depts">
                                {element.departMent && element.departMent.map(dept => (
                                    <div className="dept-label">{dept}</div>
                                ))}
                            </div></td>
                            <td>{element.salary}</td>
                            <td>{element.startDate}</td>
                            <td>
                                <img onClick={() => remove(element.id)} src={deleteIcon} alt="delete" />
                                <img onClick={() => update(element.id)} src={editIcon} alt="edit" />
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>


    )
}

export default Display