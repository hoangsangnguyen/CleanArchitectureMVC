﻿using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.ServiceModel.Teacher
{
    public class TeacherDto : BaseDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? SubjectId { get; set; }
        public string SubjectName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public bool IsManager { get; set; }
    }

    [Route("/teachers", "GET")]
    [Route("/teachers/{FirstName}/{LastName}/{DepartmentId}/{IsManager}", "GET")]
    public class GetTeachers : IReturn<BaseResponse> {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Nullable<int> DepartmentId { get; set; }
        public Nullable<bool> IsManager { get; set; }
    }

    [Route("/teachers/{Id}", "GET, DELETE")]
    public class TeacherById : IReturn<BaseResponse>
    {
        public int Id { get; set; }
    }

    [Route("/teachers", "POST")]
    public class CreateTeacher : IReturn<BaseResponse>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? SubjectId { get; set; }
        public int DepartmentId { get; set; }
        public bool IsManager { get; set; }
        public bool CreateNewUserLogin { get; set; }
    }

    [Route("/teachers", "PUT")]
    public class UpdateTeacher : IReturn<BaseResponse>
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? SubjectId { get; set; }
        public int? DepartmentId { get; set; }
        public bool? IsManager { get; set; }
    }
}
