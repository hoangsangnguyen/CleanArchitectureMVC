using AutoMapper;
using Backend.ServiceModel;
using Backend.ServiceModel.Student;
using Entity;
using Service.StudentService;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Threading.Tasks;

namespace Backend.ServiceInterface
{
    public class StudentApiServices : BaseService
    {
        private readonly IStudentService _studentService;

        public StudentApiServices(IStudentService studentService)
        {
            _studentService = studentService;
        }

        public async Task<object> Get(GetStudents request)
        {
            Expression<Func<Student, bool>> filter = x => (request.FirstName == null || x.FirstName.Contains(request.FirstName))
                                                       && (request.LastName == null || x.LastName.Contains(request.LastName))
                                                       && (request.StudentCode == null || x.StudentCode.Contains(request.StudentCode))
                                                       && (request.DateOfBirth == null || (x.DateOfBirth.HasValue && x.DateOfBirth.Value.ToString("yyyy-MM-dd").Equals(request.DateOfBirth)))
                                                       && (request.ClassId == null || x.ClassId == request.ClassId);
            var studentEntities = await _studentService.GetAll(filter: filter, includeProperties: "Class");
            var dtos = studentEntities.ToList().ConvertAll(x =>
            {
                var dto = x.ConvertTo<StudentDto>();
                dto.ClassName = x.Class.Name;
                return dto;
            });

            return new
            {
                Success = true,
                StatusCode = (int)HttpStatusCode.OK,
                Results = dtos,
                ItemCount = dtos.Count
            };
        }

        public async Task<object> Get(StudentById request)
        {
            var response = new BaseResponse();
            Expression<Func<Student, bool>> keySelector = x => x.Id == request.Id;
            var entity = await _studentService.GetById(keySelector: keySelector, includeProperties: "Class");
            var dto = entity.ConvertTo<StudentDto>();
            dto.ClassName = entity.Class.Name;

            response.Success = true;
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = dto;

            return response;
        }
        public async Task<object> Get(StudentsViewNameId request)
        {
            var models = await _studentService.GetModelsWithKeys("Id", "Name");
            return models;
        }

        //[RequiresAnyRole("admin", "manager")]
        public async Task<object> Post(CreateStudent request)
        {
            var response = new BaseResponse();
            var entity = request.ConvertTo<Student>();
            var result = await _studentService.Create(entity);
            response.Success = true;
            response.StatusCode = (int)HttpStatusCode.Created;
            response.Message = "Create student success";
            response.Results = result.ConvertTo<StudentDto>();
            return response;
        }
        //[RequiresAnyRole("admin", "manager")]
        public async Task<object> Put(UpdateStudent request)
        {
            var response = new BaseResponse();
            Expression<Func<Student, bool>> keySelector = x => x.Id == request.Id;
            var entity = await _studentService.GetById(keySelector: keySelector);
            request.ToEntity(entity);
            var result = await _studentService.Update(entity);
            response.Success = true;
            response.Message = "Update student success";
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = result.ConvertTo<StudentDto>();
            return response;
        }
        //[RequiresAnyRole("admin", "manager")]
        public async Task<object> Delete(StudentById request)
        {
            var response = new BaseResponse();
            Expression<Func<Student, bool>> keySelector = x => x.Id == request.Id;
            var result = await _studentService.Delete(keySelector:keySelector);
            response.Success = true;
            response.Message = $"Delete student with id {request.Id} success";
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = result.ConvertTo<StudentDto>();

            return response;
        }

    }
}