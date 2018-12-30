using Backend.ServiceInterface;
using Backend.ServiceModel;
using Entity;
using Service.UserService;
using ServiceStack.API.ServiceModel.User;
using ServiceStack.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ServiceStack.API.ServiceInterface
{
    public class UserApiService : BaseService
    {
        private readonly IUserService _userService;

        public UserApiService(IUserService userService)
        {
            _userService = userService;
        }

        [RequiredRole("admin")]
        public async Task<object> Get(GetUsers request)
        {
            var userEntities = await _userService.GetAll();
            var dtos = userEntities.ToList().ConvertAll(x =>
            {
                var dto = x.ConvertTo<UserDto>();
                dto.RoleName = x.Role.Display;
                return dto;
            });

            return new
            {
                Success = true,
                StatusCode = (int)HttpStatusCode.OK,
                Results = dtos,
                ItemCount = dtos.Count
            };
        }

        public async Task<object> Get(UserById request)
        {
            var response = new BaseResponse();

            var entity = await _userService.GetById(request.Id);

            // check user is owner
            if (!base.HasRole(entity.UserName)) throw new MethodAccessException();

            var dto = entity.ConvertTo<UserDto>();
            response.Success = true;
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = dto;

            return response;
        }
        
        public async Task<object> Post(CreateUser request)
        {
            var response = new BaseResponse();
            
            var entity = request.ConvertTo<User>();

            // check isValid Role
            if (!base.IsUserValidRole(entity.RoleId)) throw new MethodAccessException();

            new SaltedHash().GetHashAndSaltString(request.Password, out var hashedPassword, out var salt);
            entity.Password = hashedPassword;
            entity.Salt = salt;
            var result = await _userService.Create(entity);
            response.Success = true;
            response.StatusCode = (int)HttpStatusCode.Created;
            response.Message = "Create user success";
            response.Results = result;
            return response;
        }

        public async Task<object> Put(UpdateUser request)
        {
            var response = new BaseResponse();
            var entity = await _userService.GetById(request.Id);

            // check user is owner
            if (!base.HasRole(entity.UserName)) throw new MethodAccessException();

            request.ToEntity(entity);

            // check isValid Role
            if (!base.IsUserValidRole(entity.RoleId)) throw new MethodAccessException();

            var result = await _userService.Update(entity);
            response.Success = true;
            response.Message = "Update user success";
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = result.ConvertTo<UserDto>();
            return response;
        }

        [RequiredRole("admin")]
        public async Task<object> Delete(UserById request)
        {
            var response = new BaseResponse();

            var result = await _userService.Delete(request.Id);
            response.Success = true;
            response.Message = $"Delete user with id {request.Id} success";
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = result.ConvertTo<UserDto>();

            return response;
        }
    }
}
