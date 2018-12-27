using AutoMapper;
using Entity;
using ServiceStack.API.ServiceModel.Class;
using ServiceStack.API.ServiceModel.Department;
using ServiceStack.API.ServiceModel.Student;
using ServiceStack.API.ServiceModel.Teacher;
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
            //CreateMap<Student, StudentDto>().ReverseMap();
            //CreateMap<UpdateStudent, Student>();

            //CreateMap<Department, DepartmentDto>().ReverseMap();
            //CreateMap<UpdateDepartment, Department>();

            //CreateMap<Class, ClassDto>().ReverseMap();
            //CreateMap <UpdateClass, Class>();

            //CreateMap<Teacher, TeacherDto>().ReverseMap();
            //CreateMap<UpdateTeacher, Teacher>()
            //     .ForAllMembers(m => m.Condition((source, target, sourceValue) => sourceValue != null));
        }
    }
}
