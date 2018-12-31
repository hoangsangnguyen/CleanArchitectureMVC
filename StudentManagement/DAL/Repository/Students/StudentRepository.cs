using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using DAL.Database;
using Entity;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repository.Students
{
    public class StudentRepository : Repository<Student>, IStudentRepository
    {
        public StudentRepository(StudentContext context) : base(context)
        {
        }
    }
}
