import { useState, useEffect } from "react";
import { getEmployees } from "../services/employeeServices";
import DeleteEmployee from "./DeleteEmployee";
import { Link } from "react-router-dom";

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    
    useEffect(() => {
        fetchEmployees()
    }, [])

    async function fetchEmployees() {
        try{
            const employees = await getEmployees();
            setEmployees(employees);
        }catch(err){
            console.error(err)
        }
    }

    return (
        <div>
            <h1>Employee List</h1>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Middle Name</th>
                        <th>Birth Date</th>
                        <th>Working Days</th>
                        <th>Daily Rate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.middleName}</td>
                            <td>{employee.birthDate}</td>
                            <td>{employee.workingDays}</td>
                            <td>{employee.dailyRate}</td>
                            <td className="gap-2 flex">
                                <Link to={`/take-home-pay/${employee.id}`}>
                                    Check Pay
                                </Link>
                                <Link to={`/update/${employee.id}`}>
                                    Edit
                                </Link>
                                <DeleteEmployee id={employee.id}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default EmployeeList