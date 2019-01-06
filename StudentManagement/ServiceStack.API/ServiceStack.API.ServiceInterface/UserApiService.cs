using Backend.ServiceInterface;
using Backend.ServiceModel;
using Entity;
using Service.UserService;
using ServiceStack.API.ServiceModel.User;
using ServiceStack.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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
            Expression<Func<User, bool>> filter = x => (request.FirstName == null || x.FirstName.Contains(request.FirstName))
                                                       && (request.LastName == null || x.LastName.Contains(request.LastName))
                                                       && (request.DisplayName == null || x.DisplayName.Contains(request.DisplayName))
                                                       && (request.UserName == null || x.UserName.Contains(request.UserName))
                                                       && (request.RoleId == null || x.Role.SystemName.Equals(request.RoleId));
            var userEntities = await _userService.GetAll(filter: filter, includeProperties: "Role");
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
            Expression<Func<User, bool>> keySelector = x => x.Id == request.Id;

            var entity = await _userService.GetById(keySelector: keySelector, includeProperties: "Role");

            // check user is owner
            if (!base.IsAdminOrOwner(entity.UserName)) throw new MethodAccessException();

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
            Expression<Func<User, bool>> keySelector = x => x.Id == request.Id;
            var entity = await _userService.GetById(keySelector: keySelector);

            // check user is owner
            if (!base.IsAdminOrManagerOrOwner(entity.UserName, entity.RoleId)) throw new MethodAccessException();

            request.ToEntity(entity, new string[] { "Password" });

            if (request.Password != null && request.Password != entity.Password)
            {
                new SaltedHash().GetHashAndSaltString(request.Password, out var hashedPassword, out var salt);
                entity.Password = hashedPassword;
                entity.Salt = salt;
            }
           
            var result = await _userService.Update(entity);
            response.Success = true;
            response.Message = "Update user success";
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = result.ConvertTo<UserDto>();
            return response;
        }

        [RequiresAnyRole("admin", "manager")]
        public async Task<object> Put(UpdateUserRole request)
        {
            var response = new BaseResponse();
            Expression<Func<User, bool>> keySelector = x => x.Id == request.Id;
            var entity = await _userService.GetById(keySelector: keySelector);

            // check isValid Role
            if (!base.IsUserValidRole(request.RoleId)) throw new MethodAccessException();

            request.ToEntity(entity);
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
            Expression<Func<User, bool>> keySelector = x => x.Id == request.Id;
            var result = await _userService.Delete(keySelector: keySelector);
            response.Success = true;
            response.Message = $"Delete user with id {request.Id} success";
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = result.ConvertTo<UserDto>();

            return response;
        }
    }
}
