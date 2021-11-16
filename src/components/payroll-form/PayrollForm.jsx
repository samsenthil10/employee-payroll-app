import React, { useEffect, useState } from 'react';
import profile1 from '../../assets/profile-images/Ellipse -1.png';
import profile2 from '../../assets/profile-images/Ellipse -3.png';
import profile3 from '../../assets/profile-images/Ellipse -7.png';
import profile4 from '../../assets/profile-images/Ellipse -8.png';
import './PayrollForm.scss';
import logo from '../../assets/images/logo.png'
import { Link, useParams } from 'react-router-dom';
import EmployeePayrollService from "../../services/EmployeePayrollService";

const PayrollForm = (props) => {
    let initialValue = {
        name: '',
        profileArray: [
            { url: '../../assets/profile-images/Ellipse -1.png' },
            { url: '../../assets/profile-images/Ellipse -3.png' },
            { url: '../../assets/profile-images/Ellipse -7.png' },
            { url: '../../assets/profile-images/Ellipse -8.png' }

        ],
        allDepartment: [
            'HR', 'Sales', 'Finance', 'Engineer', 'Others'
        ],
        departments: [],
        gender: '',
        salary: '',
        day: '01',
        month: 'Jan',
        year: '2021',
        startDate: '',
        note: '',
        employeeId: '',
        profilePic: '',
        isUpdate: false,
        error: {
            departments: '',
            name: '',
            gender: '',
            salary: '',
            profilePic: '',
            startDate: ''
        }
    }
    const [formValue, setForm] = useState(initialValue);
    const [displayMessageSuccess, setDisplayMessageSuccess] = useState("");
    const [displayMessageError, setDisplayMessageError] = useState("");
    const employeeService = new EmployeePayrollService();
    const params = useParams();
    useEffect(() => {
        if (params.id) {
            getDataById(params.id);
        }
        // eslint-disable-next-line
    }, []);

    const getDataById = (id) => {
        employeeService
            .getEmployee(id)
            .then((data) => {
                let obj = data.data.data;
                setData(obj);
            })
            .catch((err) => {
            });
    };

    const setData = (obj) => {
        let array = obj.startDate.split("-");
        setForm({
            ...formValue,
            ...obj,
            departments: obj.departments,
            isUpdate: true,
            day: array[2],
            month: array[1],
            year: array[0],
        });
    };

    const changeValue = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value })
    }

    const onCheckChange = (name) => {
        let index = formValue.departments.indexOf(name);

        let checkArray = [...formValue.departments]
        if (index > -1)
            checkArray.splice(index, 1)
        else
            checkArray.push(name);
        setForm({ ...formValue, departments: checkArray });
    }
    const getChecked = (name) => {
        return formValue.departments && formValue.departments.includes(name);
    }

    const handleValidations = async () => {
        let isError = false;
        let error = {
            departments: '',
            name: '',
            gender: '',
            salary: '',
            profilePic: '',
            startDate: ''
        }
        if (!formValue.name.match('^[A-Z]{1}[a-zA-Z]{2,}')) {
            error.name = 'Name is Invalid!!'
            isError = true;
        }
        if (formValue.gender.length < 1) {
            error.gender = 'Gender is a required field'
            isError = true;
        }

        if ((formValue.salary.valueOf() < 400000) || (formValue.salary.valueOf() > 500000)) {
            error.salary = 'Salary should be between 4,00,000 and 5,00,000!!'
            isError = true;
        }
        if (formValue.profilePic.length < 1) {
            error.profilePic = 'Profile is a required field'
            isError = true;
        }

        if (formValue.departments.length < 1) {
            error.departments = 'Department is a required field'
            isError = true;
        }
        var day = formValue.day;
        var month = formValue.month;
        var year = formValue.year;
        console.log(day + " " + month + " " + year)
        var date = new Date(day + " " + month + " " + year);
        var nowDate = Date.now();
        if (date > nowDate) {
            error.startDate = "StartDate is a future Date!!"
            isError = true;
        }

        await setForm({ ...formValue, error: error })
        return isError;

    }
    const save = async (event) => {
        event.preventDefault();
        if (await handleValidations()) {
            return;
        }
        else {
            let object = {
                name: formValue.name,
                departments: formValue.departments,
                gender: formValue.gender,
                salary: formValue.salary,
                startDate: `${formValue.day} ${formValue.month} ${formValue.year}`,
                note: formValue.note,
                profilePic: formValue.profilePic,
            };
            if (formValue.isUpdate) {
                console.log(object)
                employeeService
                    .updateEmployee(params.id, object)
                    .then((data) => {
                        setDisplayMessageError("")
                        setDisplayMessageSuccess("Successfully Updated Data")
                        setTimeout(3000)
                        reset()
                    })
                    .catch((error) => {
                        setDisplayMessageSuccess("")
                        setDisplayMessageError("Error While Updating Data")
                    });
            } else {
                employeeService
                    .addEmployee(object)
                    .then((data) => {
                        setDisplayMessageError("")
                        setDisplayMessageSuccess("Successfully Added Data")
                        setTimeout(3000)
                        reset()
                    })
                    .catch((err) => {
                        setDisplayMessageSuccess("")
                        setDisplayMessageError("Error While Adding Data")
                    });
            }
        }
    }

    const reset = () => {
        setForm({ ...initialValue, id: formValue.employeeId, isUpdate: formValue.isUpdate });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return (
        <div className="payroll-main">
            <header className="header row center">

                <div className="logo">
                    <img src={logo} alt="" />
                    <div>
                        <span className="emp-text">EMPLOYEE</span><br />
                        <span className="emp-text emp-payroll">PAYROLL</span>
                    </div>
                </div>

            </header>
            <div className="content">
                <form className="form" action="#" onSubmit={save}>
                    <div className="form-head">Employee Payroll form</div>
                    <div className="row">
                        <label className="label text" htmlFor="name">Name</label>
                        <input className="input" type="text" id="name" name="name" value={formValue.name} onChange={changeValue} placeholder="Your name.." autoComplete="off" />
                        <div className="error">{formValue.error.name}</div>
                    </div>
                    <div className="row">
                        <label className="label text" htmlFor="profilePic">Profile image</label>
                        <div className="profile-radio-button">
                            <label >
                                <input type="radio" name="profilePic" checked={formValue.profilePic === '../../assets/profile-images/Ellipse -1.png'} value="../../assets/profile-images/Ellipse -1.png" onChange={changeValue} />
                                <img className="profile" src={profile1} alt="profile" />
                            </label>
                            <label >
                                <input type="radio" name="profilePic" checked={formValue.profilePic === '../../assets/profile-images/Ellipse -3.png'} value="../../assets/profile-images/Ellipse -3.png" onChange={changeValue} />
                                <img className="profile" src={profile2} alt="profile" />
                            </label>
                            <label >
                                <input type="radio" name="profilePic" checked={formValue.profilePic === '../../assets/profile-images/Ellipse -7.png'} value="../../assets/profile-images/Ellipse -7.png" onChange={changeValue} />
                                <img className="profile" src={profile3} alt="profile" />
                            </label>
                            <label >
                                <input type="radio" name="profilePic" checked={formValue.profilePic === '../../assets/profile-images/Ellipse -8.png'} value="../../assets/profile-images/Ellipse -8.png" onChange={changeValue} />
                                <img className="profile" src={profile4} alt="profile" />
                            </label>

                        </div>
                        <div className="error">{formValue.error.profilePic}</div>
                    </div>
                    <div className="row">
                        <label className="label text" htmlFor="gender">Gender</label>
                        <div>
                            <input type="radio" id="male" checked={formValue.gender === 'male'} onChange={changeValue} name="gender" value="male" />
                            <label className="text" htmlFor="male">Male</label>
                            <input type="radio" id="female" checked={formValue.gender === 'female'} onChange={changeValue} name="gender" value="female" />
                            <label className="text" htmlFor="female">Female</label>
                        </div>
                        <div className="error">{formValue.error.gender}</div>
                    </div>
                    <div className="row">
                        <label className="label text" htmlFor="departments">Department</label>
                        <div>
                            {formValue.allDepartment.map(item => (
                                <span key={item}>
                                    <input className="checkbox" type="checkbox" onChange={() => onCheckChange(item)} name={item}
                                        checked={getChecked(item)} value={item} />
                                    <label className="text" htmlFor={item}>{item}</label>
                                </span>
                            ))}

                        </div>
                        <div className="error">{formValue.error.departments}</div>
                    </div>

                    <div className="row">
                        <label className="label text" htmlFor="salary">Salary</label>
                        <input className="input" type="text" id="salary" name="salary" value={formValue.salary} onChange={changeValue} autoComplete="off" />
                        <div className="error">{formValue.error.salary}</div>
                    </div>

                    <div className="row">
                        <label className="label text" htmlFor="startDate">Start Date</label>
                        <div>
                            <select value={formValue.day} onChange={changeValue} id="day" name="day">
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            <select value={formValue.month} onChange={changeValue} id="month" name="month">
                                <option value="Jan">January</option>
                                <option value="Feb">Febuary</option>
                                <option value="Mar">March</option>
                                <option value="Apr">April</option>
                                <option value="May">May</option>
                                <option value="Jun">June</option>
                                <option value="Jul">July</option>
                                <option value="Aug">August</option>
                                <option value="Sep">September</option>
                                <option value="Oct">October</option>
                                <option value="Nov">November</option>
                                <option value="Dec">December</option>
                            </select>
                            <select value={formValue.year} onChange={changeValue} id="year" name="year">
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2016">2016</option>
                            </select>
                        </div>
                        <div className="error">{formValue.error.startDate}</div>
                    </div>

                    <div className="row">
                        <label className="label text" htmlFor="note">Notes</label>
                        <textarea onChange={changeValue} id="note" value={formValue.note} className="input" name="note" placeholder=""
                            style={{ height: '120%' }}></textarea>
                        <div className="error">{formValue.error.note}</div>
                    </div>

                    <div className="buttonParent">
                        <Link to="/" className="resetButton button cancelButton">Cancel</Link>

                        <div className="submit-reset">
                            <button type="submit" className="button submitButton" id="submitButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                            <button type="button" onClick={reset} className="resetButton button">Reset</button>
                        </div>
                    </div >
                    <div className="displayMessageSuccess">{displayMessageSuccess}</div>
                    <div className="displayMessageError">{displayMessageError}</div>
                </form >
            </div >
        </div >
    )
}
export default PayrollForm;