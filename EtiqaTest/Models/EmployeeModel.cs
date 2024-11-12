namespace EtiqaTest.Models
{
    public class EmployeeModel
    {
        public int Id { get; set; }
        public string? employeeNumber { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string middleName { get; set; }
        public DateTime birthDate { get; set; }
        public decimal dailyRate { get; set; }
        public string workingDays { get; set; }
    }
}
