import EmployeeList from './components/EmployeeList'
import AddEmployee from './components/AddEmployee'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import UpdateEmployee from './components/UpdateEmployee'
import TakeHomePay from './components/TakeHomePay'

function App() {
  return (
    <>
    <Router>
      <div className='flex gap-2'>
      <Link to="/">Employee List</Link>
      <Link to="/add">Add Employee</Link>
      </div>

      <div className='flex justify-center items-center p-10 h-screen'>
          <Routes>
            <Route path="/take-home-pay/:id" element={<TakeHomePay/>}/>
            <Route path="/add" element={<AddEmployee/>}/>
            <Route path="/update/:id" element={<UpdateEmployee/>}/>
            <Route path="/" element={<EmployeeList/>}/>

          </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
