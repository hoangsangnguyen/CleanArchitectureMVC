using Entity;
using Service.BaseService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.StudentService
{
    public interface IStudentService : IBaseService<Student>
    {
        Task<Student> Login(string UserName, string Password);
    }
}
