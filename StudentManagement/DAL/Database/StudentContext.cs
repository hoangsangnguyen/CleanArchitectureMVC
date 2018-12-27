using Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Database
{
    public class StudentContext : DbContext, IDataContext
    {
        public StudentContext(DbContextOptions<StudentContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Score>().HasKey(table => new {
                table.StudentId,
                table.SubjectId
            });
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseLazyLoadingProxies(false);
        }

        public DbSet<Department> Departments { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Score> Scores { get; set; }


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
