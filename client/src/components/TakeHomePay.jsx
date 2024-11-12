import { calculateTakeHomePay, getEmployeeById } from "@/services/employeeServices";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TakeHomePay() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [form, setForm] = useState({
        startDate: null,
        endDate: null,
    });

    useEffect(() => {
        fetchEmployee();
    }, [id]); // Added id dependency to prevent infinite loops

    async function fetchEmployee() {
        try {
            const employee = await getEmployeeById(id);
            setEmployee(employee);
        } catch (err) {
            console.error(err);
        }
    }

    async function onChange(e) {
        const { name, value } = e.target;

        const updatedForm = {
            ...form,
            [name]: value,
        };
        setForm(updatedForm);

        if (updatedForm.startDate && updatedForm.endDate) {
            try {
                console.log(updatedForm.startDate, updatedForm.endDate, id)
                const takeHomePay = await calculateTakeHomePay(id, updatedForm.startDate, updatedForm.endDate);
                setEmployee((prev) => ({
                    ...prev,
                    takeHomePay,
                }));
            } catch (err) {
                console.error(err);
            }
        }
    }

    return (
        <div>
            <h1>Check Pay of {`${employee?.lastName} ${employee?.firstName}`}</h1>
            <div>
                <label>Start Date</label>
                <input
                    className="text-white"
                    type="date"
                    name="startDate"
                    onChange={onChange}
                />
                <label>End Date</label>
                <input
                    className="text-white"
                    type="date"
                    name="endDate"
                    onChange={onChange}
                />
            </div>
            <p>{employee?.takeHomePay || 0}</p>
        </div>
    );
}

export default TakeHomePay;
