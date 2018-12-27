using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceStack.API.ServiceModel.Class
{
    public class ClassDto : BaseDto
    {
        public string Name { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
    }

    [Route("/classes", "GET")]
    public class GetClasses : IReturn<BaseResponse> { }

    [Route("/classes/{Id}", "GET")]
    [Route("/classes", "DELETE")]
    public class ClassById : IReturn<BaseResponse>
    {
        public int Id { get; set; }
    }

    [Route("/classes", "POST")]
    public class CreateClass : IReturn<BaseResponse>
    {
        public string Name { get; set; }
        public int DepartmentId { get; set; }
    }

    [Route("/classes", "PUT")]
    public class UpdateClass : IReturn<BaseResponse>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? DepartmentId { get; set; }
    }
}
