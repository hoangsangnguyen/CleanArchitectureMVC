using DAL.UnitOfWork;
using Entity;
using Microsoft.EntityFrameworkCore;
using Service.BaseService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Service.ClassService
{
    public class ClassService : BaseService<Class>, IClassService
    {
        public ClassService(IUnitOfWork<Class> unitOfWork) : base(unitOfWork)
        {
        }
    }
}
