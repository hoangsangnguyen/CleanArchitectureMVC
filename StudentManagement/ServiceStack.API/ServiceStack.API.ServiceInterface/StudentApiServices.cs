using AutoMapper;
using Backend.ServiceModel;
using Backend.ServiceModel.Student;
using Entity;
using Service.StudentService;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
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
            var studentEntities = await _studentService.GetAll();
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

            var entity = await _studentService.GetById(request.Id);
            var dto = entity.ConvertTo<StudentDto>();
            response.Success = true;
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = dto;

            return response;
        }

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

        public async Task<object> Put(UpdateStudent request)
        {
            var response = new BaseResponse();
            var entity = await _studentService.GetById(request.Id);
            request.ToEntity(entity);
            var result = await _studentService.Update(entity);
            response.Success = true;
            response.Message = "Update student success";
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = result.ConvertTo<StudentDto>();
            return response;
        }

        public async Task<object> Delete(StudentById request)
        {
            var response = new BaseResponse();

            var result = await _studentService.Delete(request.Id);
            response.Success = true;
            response.Message = $"Delete student with id {request.Id} success";
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = result.ConvertTo<StudentDto>();

            return response;
        }

        public async Task<object> POST(StudentLogin request)
        {
            var response = new BaseResponse();

            var result = await _studentService.Login(request.UserName, request.Password);
            response.Success = true;
            response.Message = $"Login for student with id {result.Id} success";
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = result.ConvertTo<StudentDto>();

            return response;
        }
    }
}