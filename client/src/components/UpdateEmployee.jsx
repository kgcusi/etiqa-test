import { useEffect, useState } from "react";
import { addEmployee, getEmployeeById, updateEmployee } from "../services/employeeServices";
import { useParams } from "react-router-dom";

function UpdateEmployee() {
    const {id} = useParams()

    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        middleName: '',
        birthDate: '',
        workingDays: "MWF",
        dailyRate: 0
     })

     useEffect(() => {
        fetchEmployee()
    }, [])
    
    async function fetchEmployee() {
        const employee = await getEmployeeById(id)
        if(employee) {
            employee.birthDate = new Date(employee.birthDate).toISOString().split('T')[0]
            setEmployee(employee)
        }
    }
    
     function onSubmit(e) {
         e.preventDefault();
        updateEmployee(employee)
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
                <input className="text-white rounded p-3 max-w-56" onChange={handleChange} type="text" name="firstName" placeholder="First Name" value={employee.firstName}/>
                <input className="text-white rounded p-3 max-w-56" onChange={handleChange} type="text" name="lastName" placeholder="Last Name" value={employee.lastName}/>
                <input className="text-white rounded p-3 max-w-56" onChange={handleChange} type="text" name="middleName" placeholder="Middle Name" value={employee.middleName}/>
                <input className="text-white rounded p-3 max-w-56" onChange={handleChange} type="date" name="birthDate" placeholder="First Name" value={employee.birthDate}/>
                <input className="text-white rounded p-3 max-w-56" onChange={handleChange} type="number" name="dailyRate" placeholder="First Name" value={employee.dailyRate}/>
                <select className="text-white rounded p-3 max-w-56" onChange={handleChange} name="workingDays" value={employee.workingDays}>
                    <option value="MWF">MWF</option>
                    <option value="TTHS">TTHS</option>
                </select>
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
     )
}

export default UpdateEmployee