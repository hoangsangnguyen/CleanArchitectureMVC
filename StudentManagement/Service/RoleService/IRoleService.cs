﻿using Entity;
using Service.BaseService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.RoleService
{
    public interface IRoleService : IBaseService<Role>
    {
        Task<IEnumerable<Role>> GetAvaiableRolesForUserCreation(int userLevel);
    }
}
