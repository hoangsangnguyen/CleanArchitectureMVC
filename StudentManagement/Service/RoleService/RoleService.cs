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

        public async Task<IEnumerable<Role>> GetAvaiableRolesForUserCreation(int level)
        {
            var rolesEntities = await _unitOfWork.Repository.GetAll().Where(role => role.Level > level).ToListAsync();
            return rolesEntities;
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
