using Backend.ServiceModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceStack.API.ServiceModel.Role
{
    public class RoleDto : BaseDto
    {
        public string SystemName { get; set; }
        public string Display { get; set; }
    }

    [Route("/roles", "GET")]
    [Route("/roles/{SystemName}/{Display}", "GET")]
    public class GetRoles : IReturn<BaseResponse>
    {
        public string SystemName { get; set; }
        public string Display { get; set; }
    }

    [Route("/roles/{SystemName}", "GET, DELETE")]
    public class RoleBySystemName : IReturn<BaseResponse>
    {
        public string SystemName { get; set; }
    }

    [Route("/roles/viewmodel", "GET")]
    public class RoleViewNameId : IReturn<BaseResponse>
    {
    }

    [Route("/roles", "POST")]
    public class CreateRole : IReturn<BaseResponse>
    {
        public string SystemName { get; set; }
        public string Display { get; set; }
    }

    [Route("/roles", "PUT")]
    public class UpdateRole : IReturn<BaseResponse>
    {
        public string SystemName { get; set; }
        public string Display { get; set; }
    }
}
