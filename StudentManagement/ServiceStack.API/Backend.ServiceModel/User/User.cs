using Backend.ServiceModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceStack.API.ServiceModel.User
{
    public class UserDto : BaseDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DisplayName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
        public string RoleId { get; set; }
        public string RoleName { get; set; }
    }

    [Route("/users", "GET")]
    [Route("/users/{FirstName}/{LastName}/{DisplayName}/{UserName}/{RoleId}", "GET")]
    public class GetUsers : IReturn<BaseResponse> {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DisplayName { get; set; }
        public string UserName { get; set; }
        public string RoleId { get; set; }
    }

    [Route("/users/{Id}", "GET, DELETE")]
    public class UserById : IReturn<BaseResponse>
    {
        public int Id { get; set; }
    }

    [Route("/users", "POST")]
    public class CreateUser : IReturn<BaseResponse>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DisplayName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string RoleId { get; set; }
    }

    [Route("/users", "PUT")]
    public class UpdateUser : IReturn<BaseResponse>
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DisplayName { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
    }

    [Route("/users/updateUserAndRole", "PUT")]
    public class UpdateUserAndRole : IReturn<BaseResponse>
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DisplayName { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
        public string RoleId { get; set; }
    }

    [Route("/users/updateRole", "PUT")]
    public class UpdateUserRole : IReturn<BaseResponse>
    {
        public int Id { get; set; }
        public string RoleId { get; set; }
    }
}
