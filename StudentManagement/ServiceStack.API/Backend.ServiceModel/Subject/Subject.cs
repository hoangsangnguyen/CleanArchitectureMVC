﻿using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.ServiceModel.Subject
{
    public class SubjectDto : BaseDto
    {
        public string Name { get; set; }
    }

    [Route("/subjects", "GET")]
    public class GetSubjects : IReturn<BaseResponse> {
        public string Name { get; set; }
    }

    [Route("/subjects/{Id}", "GET, DELETE")]
    public class SubjectById : IReturn<BaseResponse>
    {
        public int Id { get; set; }
    }

    [Route("/subjects/viewmodel", "GET")]
    public class SubjectsViewNameId : IReturn<BaseResponse>
    {
    }

    [Route("/subjects", "POST")]
    public class CreateSubject : IReturn<BaseResponse>
    {
        public string Name { get; set; }
    }

    [Route("/subjects", "PUT")]
    public class UpdateSubject : IReturn<BaseResponse>
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
