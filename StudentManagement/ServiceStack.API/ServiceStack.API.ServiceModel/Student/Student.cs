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
        public double Score { get; set; }
    }

    public class StudentForCreateOrUpdate : IReturn<BaseResponse>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public double Score { get; set; }
    }

    [Route("/student", "GET")]
    public class GetStudents : IReturn<BaseResponse>{}

    [Route("/student/{Id}", "GET")]
    public class GetStudentById : IReturn<BaseResponse>
    {
        public int Id { get; set; }
    }

    [Route("/student", "POST")]
    [Route("/student/{Id}", "PUT")]
    public class CreateOrUpdateStudent : IReturn<BaseResponse>
    {
        public int? Id { get; set; }
        public StudentForCreateOrUpdate StudentDto { get; set; }
    }

}
