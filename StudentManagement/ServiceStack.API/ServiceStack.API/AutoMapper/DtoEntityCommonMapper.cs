using AutoMapper;
using Entity;
using ServiceStack.API.ServiceModel.Class;
using ServiceStack.API.ServiceModel.Department;
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

            CreateMap<Department, DepartmentDto>().ReverseMap();
            CreateMap<UpdateDepartment, Department>();

            CreateMap<Class, ClassDto>().ReverseMap();
            CreateMap <UpdateClass, Class>();
            #endregion

            #region Dto to Entity

            #endregion
        }
    }
}
