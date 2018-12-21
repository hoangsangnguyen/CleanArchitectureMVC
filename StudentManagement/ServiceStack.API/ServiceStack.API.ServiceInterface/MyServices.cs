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
    public class MyServices : Service
    {
        private readonly IStudentService _studentService;

        public MyServices(IStudentService studentService)
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
                var dtos = studentEntities.ToList().ConvertAll(x => x.ConvertTo<StudentDto>());
                return new
                {
                    Success = true,
                    StatusCode = HttpStatusCode.OK,
                    Results = dtos,
                    ItemCount = dtos.Count
                };
            }
            catch (Exception e)
            {
                Console.WriteLine("Get all student error : " + e.Message);
                return new
                {
                    Success = false,
                    StatusCode = HttpStatusCode.BadRequest,
                    Results = e.Message,
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
                if (entity != null)
                {
                    var dto = entity.ConvertTo<StudentDto>();
                    response.Success = true;
                    response.StatusCode = HttpStatusCode.OK;
                    response.Results = dto;
                    return response;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Error GET STUDENT BY ID : " + e.Message);
                response.Results = e.Message;
            }

            response.Success = false;
            response.StatusCode = HttpStatusCode.NotFound;

            return response;
        }

        public async Task<object> Post(CreateStudent request)
        {
            var response = new BaseResponse();

            //if (!ModelState.IsValid)
            //{
            //    response.Success = false;
            //    response.StatusCode = HttpStatusCode.BadRequest;
            //    response.Results = null;
            //    return BadRequest(response);
            //}

            var entity = request.ConvertTo<Student>();
            try
            {
                int result = await _studentService.Create(entity);
                if (result > 0)
                {
                    response.Success = true;
                    response.StatusCode = HttpStatusCode.Created;
                    response.Results = result;
                    return response;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Error craete : " + e.Message);
                response.Results = e.Message;
            }
            response.Success = false;
            response.StatusCode = HttpStatusCode.BadRequest;
            return response;
        }

        public async Task<object> Put(UpdateStudent request)
        {
            var response = new BaseResponse();

            //if (!ModelState.IsValid)
            //{
            //    response.Success = false;
            //    response.StatusCode = HttpStatusCode.BadRequest;
            //    response.Results = null;
            //    return BadRequest();
            //}
            try
            {
                var entity = await _studentService.GetById(request.Id);
                if (entity != null)
                {
                    Mapper.Map(request, entity);
                    int result = await _studentService.Update(entity);
                    if (result > 0)
                    {
                        response.Success = true;
                        response.StatusCode = HttpStatusCode.OK;
                        response.Results = result;
                        return response;
                    }
                }

                response.Results = "Not found";
                
            }
            catch (Exception e)
            {
                Console.WriteLine("Error update : " + e.Message);
                response.Results = e.Message;
            }

            response.Success = false;
            response.StatusCode = HttpStatusCode.BadRequest;
            return response;
        }

        public async Task<object> Delete(StudentById request)
        {
            var response = new BaseResponse();
            try
            {
                var result = await _studentService.Delete(request.Id);
                if (result > 0)
                {
                    response.Success = true;
                    response.StatusCode = HttpStatusCode.OK;
                    response.Results = request.Id;
                    return response;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Error delete student: " + e.Message);
                response.Results = e.Message;
            }

            response.Success = false;
            response.StatusCode = HttpStatusCode.NotFound;

            return response;
        }

    }
}