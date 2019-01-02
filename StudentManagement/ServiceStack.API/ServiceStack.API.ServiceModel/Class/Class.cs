using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.ServiceModel.Class
{
    public class ClassDto : BaseDto
    {
        public string Name { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
    }

    [Route("/classes", "GET")]
    [Route("/classes/{Name}/{DepartmentId}", "GET")]
    public class GetClasses : IReturn<BaseResponse> {
        public string Name { get; set; }
        public Nullable<int> DepartmentId { get; set; }
    }

    [Route("/classes/{Id}", "GET, DELETE")]
    public class ClassById : IReturn<BaseResponse>
    {
        public int Id { get; set; }
    }

    [Route("/classes/viewmodel", "GET")]
    public class ClassesViewNameId : IReturn<BaseResponse>
    {
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
