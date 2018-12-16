using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace DAL.Database
{
    public class StudentContext : DbContext, IDataContext
    {
        public StudentContext(DbContextOptions<StudentContext> options) : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }

        public async Task<int> SaveChangeAsync()
        {
            var change = await base.SaveChangesAsync();
            return change;
        }

        public ChangeTracker changeTracker()
        {
            return base.ChangeTracker;
        }
    }
}
