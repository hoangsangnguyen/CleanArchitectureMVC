using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceStack.API.ServiceModel.Student
{
    public class StudentDto : BaseDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ClassName { get; set; }
    }

    [Route("/students", "GET")]
    public class GetStudents : IReturn<BaseResponse>{}

    [Route("/students/{Id}", "GET")]
    [Route("/students", "DELETE")]
    public class StudentById : IReturn<BaseResponse>
    {
        public int Id { get; set; }
    }

    [Route("/students", "POST")]
    public class CreateStudent : IReturn<BaseResponse>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int ClassId { get; set; }
    }

    [Route("/students", "PUT")]
    public class UpdateStudent : IReturn<BaseResponse>
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int ClassId { get; set; }
    }

}
