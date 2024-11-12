const API_URL = 'https://localhost:7129/api/Employee';

export const getEmployees = async () => {
    const response = await fetch(API_URL);
    if(!response.ok) throw new Error('Failed to fetch employees');
    return await response.json()
}

export const getEmployeeById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if(!response.ok) throw new Error('Failed to fetch employee');
    return await response.json();
}

export const addEmployee = async (employee) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    });

    if(!response.ok) throw new Error('Failed to add employee');
    return await response.json();
}

export const updateEmployee = async (employee) => {
    const response = await fetch(`${API_URL}/${employee.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    });

    if(!response.ok) throw new Error('Failed to update employee');
    return await response.json();
}

export const deleteEmployee = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    if(!response.ok) throw new Error('Failed to delete employee');
    return await response.json();
}

export const calculateTakeHomePay = async (id, startDate, endDate) => {
    const response = await fetch(`${API_URL}/${id}/takehomepay`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id, startDate, endDate})
    })
    console.log(id, startDate, endDate);
    if(!response.ok) throw new Error('Failed to calculate take home pay');
    return await response.json();
}
