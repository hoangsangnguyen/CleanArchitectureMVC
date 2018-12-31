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
        public async Task<Student> Login(string UserName, string Password)
        {
            var student = await _unitOfWork.Repository.GetAll().SingleAsync(x => x.StudentCode == UserName
                                                                                    && x.DateOfBirth == DateTime.Parse(Password));
            return student;
        }
    }
}
