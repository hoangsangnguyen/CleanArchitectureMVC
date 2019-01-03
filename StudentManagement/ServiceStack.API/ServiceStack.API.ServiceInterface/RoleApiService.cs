using Backend.ServiceInterface;
using Backend.ServiceModel;
using Entity;
using Service.RoleService;
using ServiceStack.API.ServiceModel.Role;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ServiceStack.API.ServiceInterface
{
    [RequiredRole("admin")]
    public class RoleApiService : BaseService
    {
        private readonly IRoleService _roleService;

        public RoleApiService(IRoleService roleService)
        {
            _roleService = roleService;
        }

        public async Task<object> Get(GetRoles request)
        {
            Expression<Func<Role, bool>> filter = x => (request.SystemName == null || x.SystemName.Contains(request.SystemName))
                                                       && (request.Display == null || x.Display.Contains(request.Display));
            var studentEntities = await _roleService.GetAll(filter: filter);
            var dtos = studentEntities.ToList().ConvertAll(x => x.ConvertTo<RoleDto>());

            return new
            {
                Success = true,
                StatusCode = (int)HttpStatusCode.OK,
                Results = dtos,
                ItemCount = dtos.Count
            };
        }

        public async Task<object> Get(RoleBySystemName request)
        {
            var response = new BaseResponse();
            Expression<Func<Role, bool>> keySelector = x => x.SystemName == request.SystemName;
            var entity = await _roleService.GetById(keySelector: keySelector);
            var dto = entity.ConvertTo<RoleDto>();
            response.Success = true;
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = dto;

            return response;
        }
        public async Task<object> Get(RoleViewNameId request)
        {
            var models = await _roleService.GetModelsWithKeys("SystemName", "Display");
            return models;
        }

        public async Task<object> GetAvaiableRolesForUserCreation(RoleLevel request)
        {
            var models = await _roleService.GetAvaiableRolesForUserCreation(request.Level);
            return models;
        }

        [RequiredRole("admin")]
        public async Task<object> Post(CreateRole request)
        {
            var response = new BaseResponse();
            var entity = request.ConvertTo<Role>();
            var result = await _roleService.Create(entity);
            response.Success = true;
            response.StatusCode = (int)HttpStatusCode.Created;
            response.Message = "Create role success";
            response.Results = result.ConvertTo<RoleDto>();
            return response;
        }
        [RequiredRole("admin")]
        public async Task<object> Put(UpdateRole request)
        {
            var response = new BaseResponse();
            Expression<Func<Role, bool>> keySelector = x => x.SystemName == request.SystemName;
            var entity = await _roleService.GetById(keySelector: keySelector);
            request.ToEntity(entity);
            var result = await _roleService.Update(entity);
            response.Success = true;
            response.Message = "Update role success";
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = result.ConvertTo<RoleDto>();
            return response;
        }
        [RequiredRole("admin")]
        public async Task<object> Delete(RoleBySystemName request)
        {
            var response = new BaseResponse();
            Expression<Func<Role, bool>> keySelector = x => x.SystemName == request.SystemName;
            var result = await _roleService.Delete(keySelector: keySelector);
            response.Success = true;
            response.Message = $"Delete role with id {request.SystemName} success";
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = result.ConvertTo<RoleDto>();

            return response;
        }
    }
}
