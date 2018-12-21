using DAL.UnitOfWork;
using Entity;
using Service.BaseService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.StudentService
{
    public class IStudentService : BaseService<Student>, IStudentService
    {
        public IStudentService(IUnitOfWork<Student> unitOfWork) : base(unitOfWork)
        {
        }
    }
}
