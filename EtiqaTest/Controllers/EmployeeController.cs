using EtiqaTest.Data;
using EtiqaTest.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace EtiqaTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EtiqaContext _context;

        public EmployeeController(EtiqaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeModel>>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<EmployeeModel>> AddEmployee(EmployeeModel employee)
        {
            employee.employeeNumber = GenerateEmployeeNumber(employee);
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployees", new { id = employee.Id }, employee);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeModel>> GetEmployeeById(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            return employee;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<EmployeeModel>> UpdateEmployee(int id, EmployeeModel employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }
            _context.Entry(employee).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("{id}/takehomepay")]
        public async Task<ActionResult<object>> GenerateTakeHomePay(int id, DateTime startDate, DateTime endDate)
        {
            //Get Employee
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            int workingDaysCount = 0;
            //Loop through each day from startDate to endDate
            for (DateTime date = startDate; date <= endDate; date = date.AddDays(1))
            {
                if (employee.workingDays == "MWF" && (date.DayOfWeek == DayOfWeek.Monday || date.DayOfWeek == DayOfWeek.Wednesday || date.DayOfWeek == DayOfWeek.Friday))
                {
                    workingDaysCount++;
                }
                else if (employee.workingDays == "TTHS" && (date.DayOfWeek == DayOfWeek.Tuesday || date.DayOfWeek == DayOfWeek.Thursday))
                {
                    workingDaysCount++;
                }
            }

            if (employee.birthDate >= startDate && employee.birthDate <= endDate)
            {
                workingDaysCount++;
            }

            var takeHomePay = employee.dailyRate * workingDaysCount;

            return takeHomePay;
        }
        private string GenerateEmployeeNumber(EmployeeModel employee)
        {
            //Extract first 3 letters of the last name (* if less than 3 letters)
            var lastName = employee.lastName.Length >= 3 ? employee.lastName.Substring(0, 3) : employee.lastName.PadRight(3, '*');
            //5 Random Digits
            var random = new Random().Next(10000,99999).ToString();
            //Birthdate in DDMMMYYYY format
            var birthDate = employee.birthDate.ToString("ddMMMyyyy").ToUpper();

            return $"{lastName}-{random}-{birthDate}";
        }


    }
}
