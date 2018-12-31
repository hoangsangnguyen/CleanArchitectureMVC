using DAL.UnitOfWork;
using Entity;
using Microsoft.EntityFrameworkCore;
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

        public override async Task<IEnumerable<object>> GetModelsWithKeys(params string[] keys)
        {
            var models = await _unitOfWork.Repository.GetAll().Select(
                x => new
                {
                    Id = x.Id,
                    Name = x.Name
                }).ToListAsync();
            return models;
        }
    }
}
