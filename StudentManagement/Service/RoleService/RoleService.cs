using DAL.UnitOfWork;
using Entity;
using Microsoft.EntityFrameworkCore;
using Service.BaseService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.RoleService
{
    public class RoleService : BaseService<Role>, IRoleService
    {
        public RoleService(IUnitOfWork<Role> unitOfWork) : base(unitOfWork)
        {
        }

        public override async Task<IEnumerable<object>> GetModelsWithKeys(params string[] keys)
        {
            var models = await _unitOfWork.Repository.GetAll().Select(
                x => new
                {
                    Id = x.SystemName,
                    Name = x.Display
                }).ToListAsync();
            return models;
        }
    }
}
