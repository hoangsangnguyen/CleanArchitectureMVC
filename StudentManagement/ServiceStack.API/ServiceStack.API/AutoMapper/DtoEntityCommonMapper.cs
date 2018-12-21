using AutoMapper;
using Entity;
using ServiceStack.API.ServiceModel.Student;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.AutoMapper
{
    public class DtoEntityCommonMapper : Profile
    {
        public DtoEntityCommonMapper()
        {
            #region Enity To Dto
            CreateMap<Student, StudentDto>().ReverseMap();
            CreateMap<UpdateStudent, Student>();
            #endregion

            #region Dto to Entity

            #endregion
        }
    }
}
