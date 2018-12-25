using DAL.UnitOfWork;
using Entity;
using Service.BaseService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.DepartmentService
{
    public class DepartmentService : BaseService<Department>, IDepartmentService
    {
        public DepartmentService(IUnitOfWork<Department> unitOfWork) : base(unitOfWork)
        {
        }
    }
}
