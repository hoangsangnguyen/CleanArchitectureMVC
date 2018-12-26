using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using DAL.Database;
using Entity;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repository
{
    public class StudentRepository : Repository<Student>, IStudentRepository
    {
        public StudentRepository(StudentContext context) : base(context)
        {
        }

        public override IQueryable<Student> GetAll()
        {
            var entites = this._context.Students.Include(x => x.Class);
            return entites;
        }
    }
}
