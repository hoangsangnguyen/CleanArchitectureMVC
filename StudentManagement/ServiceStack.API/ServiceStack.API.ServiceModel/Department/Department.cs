using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceStack.API.ServiceModel.Department
{
    public class DepartmentDto : BaseDto
    {
        public string Name { get; set; }
    }

    public class DepartmentForCreateOrUpdate : IReturn<BaseResponse>
    {
        public string Name { get; set; }
    }

    [Route("/departments", "GET")]
    public class GetDepartments : IReturn<BaseResponse> { }

    [Route("/departments/{Id}", "GET")]
    [Route("/departments", "DELETE")]
    public class DepartmentById : IReturn<BaseResponse>
    {
        public int Id { get; set; }
    }

    [Route("/departments", "POST")]
    public class CreateDepartment : IReturn<BaseResponse>
    {
        public string Name { get; set; }
    }

    [Route("/departments", "PUT")]
    public class UpdateDepartment : IReturn<BaseResponse>
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
