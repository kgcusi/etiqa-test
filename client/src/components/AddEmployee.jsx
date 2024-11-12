import { useState } from "react";
import { addEmployee } from "../services/employeeServices";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        middleName: '',
        birthDate: '',
        workingDays: "MWF",
        dailyRate: 0
     })

     async function onSubmit(e) {
         e.preventDefault();
        await addEmployee(employee)
        navigate('/')
     }

     function handleChange(e) {
         const {name, value} = e.target;
         setEmployee({
             ...employee,
             [name]: value
         })
     }

     return (
        <div>
            <h1>Create Employee</h1>
            <form onSubmit={onSubmit} className="flex flex-col gap-2">
                <input className="text-white p-2" onChange={handleChange} type="text" name="firstName" placeholder="First Name" value={employee.firstName}/>
                <input className="text-white p-2" onChange={handleChange} type="text" name="lastName" placeholder="Last Name" value={employee.lastName}/>
                <input className="text-white p-2" onChange={handleChange} type="text" name="middleName" placeholder="Middle Name" value={employee.middleName}/>
                <input className="text-white p-2" onChange={handleChange} type="date" name="birthDate" placeholder="First Name" value={employee.birthDate}/>
                <input className="text-white p-2" onChange={handleChange} type="number" name="dailyRate" placeholder="First Name" value={employee.dailyRate}/>
                <select className="text-white p-2" onChange={handleChange} name="workingDays" value={employee.workingDays}>
                    <option value="MWF">MWF</option>
                    <option value="TTHs">TTHs</option>
                </select>
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
     )
}

export default AddEmployee