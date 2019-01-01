using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.ServiceModel.Department
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
    [Route("/departments/name/{Name}", "GET")]
    public class GetDepartments : IReturn<BaseResponse> {
        public string Name { get; set; }
    }

    [Route("/departments/{Id}", "GET, Delete")]
    public class DepartmentById : IReturn<BaseResponse>
    {
        public int Id { get; set; }
    }

    [Route("/departments/viewmodel", "GET")]
    public class DepartmentViewNameId : IReturn<BaseResponse>
    {
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
