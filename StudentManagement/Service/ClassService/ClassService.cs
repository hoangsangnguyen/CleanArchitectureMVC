using DAL.UnitOfWork;
using Entity;
using Microsoft.EntityFrameworkCore;
using Service.BaseService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.ClassService
{
    public class ClassService : BaseService<Class>, IClassService
    {
        public ClassService(IUnitOfWork<Class> unitOfWork) : base(unitOfWork)
        {
        }
        public async override Task<IEnumerable<Class>> GetAll()
        {
            var entities = await _unitOfWork.Repository.GetAll().Include("Department").ToListAsync();

            return entities;
        }

    }
}
