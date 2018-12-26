using DAL.UnitOfWork;
using Entity;
using Microsoft.EntityFrameworkCore;
using Service.BaseService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.StudentService
{
    public class StudentService : BaseService<Student>, IStudentService
    {
        public StudentService(IUnitOfWork<Student> unitOfWork) : base(unitOfWork)
        {
        }

        public async override Task<IEnumerable<Student>> GetAll()
        {
            var entities = await _unitOfWork.Repository.GetAll().Include("Class").ToListAsync();

            return entities;
        }
    }
}
