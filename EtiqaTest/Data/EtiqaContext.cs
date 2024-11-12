using EtiqaTest.Models;
using Microsoft.EntityFrameworkCore;

namespace EtiqaTest.Data
{
    public class EtiqaContext: DbContext
    {
        public EtiqaContext(DbContextOptions<EtiqaContext> options) : base(options)
        {
        }

        public DbSet<EmployeeModel> Employees { get; set; }
    }
}
