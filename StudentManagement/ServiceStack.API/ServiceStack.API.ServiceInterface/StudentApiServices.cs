using AutoMapper;
using Entity;
using Service.StudentService;
using ServiceStack;
using ServiceStack.API.ServiceModel;
using ServiceStack.API.ServiceModel.Student;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace ServiceStack.API.ServiceInterface
{
    public class StudentApiServices : BaseService
    {
        private readonly IStudentService _studentService;

        public StudentApiServices(IStudentService studentService)
        {
            _studentService = studentService;
        }

        public object Any(Hello request)
        {
            return new HelloResponse { Result = $"Hello, {request.Name}!" };
        }

        public async Task<object> Get(GetStudents request)
        {
            try
            {
                var studentEntities = await _studentService.GetAll();
                var dtos = studentEntities.ToList().ConvertAll(x => {
                    var dto = x.ConvertTo<StudentDto>();
                    var classOfStudent = x.Class;
                    dto.ClassName = classOfStudent.Name;
                    return dto;
                });

                return new
                {
                    Success = true,
                    StatusCode = HttpStatusCode.OK.ConvertTo<int>(),
                    Results = dtos,
                    ItemCount = dtos.Count
                };
            }
            catch (WebServiceException webEx)
            {
                Console.WriteLine("Get all student error : " + webEx.ErrorMessage);
                return new
                {
                    Success = false,
                    StatusCode = webEx.StatusCode,
                    Message = webEx.ErrorMessage,
                    ItemCount = 0
                };
            }
        }

        public async Task<object> Get(StudentById request)
        {
            var response = new BaseResponse();

            try
            {
                var entity = await _studentService.GetById(request.Id);
                var dto = entity.ConvertTo<StudentDto>();
                response.Success = true;
                response.StatusCode = HttpStatusCode.OK.ConvertTo<int>();
                response.Results = dto;
            }
            catch (WebServiceException webEx)
            {
                response.Success = false;
                response.StatusCode = webEx.StatusCode;
                response.Message = webEx.ErrorMessage;
            }
            return response;
        }

        public async Task<object> Post(CreateStudent request)
        {
            var response = new BaseResponse();
            try
            {
                var entity = request.ConvertTo<Student>();
                var result = await _studentService.Create(entity);
                response.Success = true;
                response.StatusCode = HttpStatusCode.Created.ConvertTo<int>();
                response.Message = "Create student success";
                response.Results = result;
                return response;
            }
            catch (WebServiceException webEx)
            {
                response.Success = false;
                response.StatusCode = webEx.StatusCode;
                response.Message = webEx.ErrorMessage;
            }
            return response;
        }

        public async Task<object> Put(UpdateStudent request)
        {
            var response = new BaseResponse();
            try
            {
                var entity = await _studentService.GetById(request.Id);
                Mapper.Map(request, entity);
                var result = await _studentService.Update(entity);
                response.Success = true;
                response.Message = "Update student succees";
                response.StatusCode = HttpStatusCode.OK.ConvertTo<int>();
                response.Results = result;
                return response;
            }
            catch (WebServiceException webEx)
            {
                response.Success = false;
                response.StatusCode = webEx.StatusCode;
                response.Message = webEx.ErrorMessage;
            }
            return response;
        }

        public async Task<object> Delete(StudentById request)
        {
            var response = new BaseResponse();
            try
            {
                var result = await _studentService.Delete(request.Id);
                response.Success = true;
                response.Message = $"Delete student with id {request.Id} success";
                response.StatusCode = HttpStatusCode.OK.ConvertTo<int>();
                response.Results = request.Id;
                return response;
            }
            catch (WebServiceException webEx)
            {
                response.Success = false;
                response.StatusCode = webEx.StatusCode;
                response.Message = webEx.ErrorMessage;
            }
            return response;
        }

    }
}