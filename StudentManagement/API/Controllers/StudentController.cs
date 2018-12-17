using API.Models;
using AutoMapper;
using Entity;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Service.StudentService;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowSpecificOrigin")]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;
        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        // GET api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentDto>>> GetAllStudents()
        {
            try
            {
                var studentEntities = await _studentService.GetAll();
                var dtos = Mapper.Map<IEnumerable<StudentDto>>(studentEntities);
                var response = new BaseResponse
                {
                    Success = true,
                    StatusCode = HttpStatusCode.OK,
                    Results = dtos
                };
                return Ok(response);
            } catch (Exception e)
            {
                Console.WriteLine("Get all student error : " + e.Message);
                var response = new BaseResponse
                {
                    Success = false,
                    StatusCode = HttpStatusCode.BadRequest,
                    Results = e.Message
                };
                return BadRequest(response);
            }

        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentDto>> GetStudentById(int id)
        {
            var response = new BaseResponse();

            try
            {
                var entity = await _studentService.GetById(id);
                if (entity == null) {
                    response.Success = false;
                    response.StatusCode = HttpStatusCode.NotFound;
                    response.Results = null;
                    return NotFound(response);
                }
                var dto = Mapper.Map<StudentDto>(entity);
                response.Success = true;
                response.StatusCode = HttpStatusCode.OK;
                response.Results = dto;
                return Ok(response);

            } catch (Exception e)
            {
                Console.WriteLine("Error GET STUDENT BY ID : " + e.Message);
                response.Success = false;
                response.StatusCode = HttpStatusCode.NotFound;
                response.Results = e.Message;
                return NotFound(response);
            }
        }

        [HttpPost]
        [EnableCors("AllowSpecificOrigin")]
        public async Task<ActionResult> CreateStudent([FromBody]StudentForCreation dto)
        {
            var response = new BaseResponse();

            if (!ModelState.IsValid)
            {
                response.Success = false;
                response.StatusCode = HttpStatusCode.BadRequest;
                response.Results = null;
                return BadRequest(response);
            }
            var entity = Mapper.Map<Student>(dto);
            try
            {
                int result = await _studentService.Create(entity);
                if (result > 0)
                {
                    return CreatedAtAction("GetStudentById", new { id = result }, new { Success = true,
                                                                                        StatusCode = HttpStatusCode.Created,
                                                                                        Results = result
                });
                }

               
            }
            catch (Exception e)
            {
                Console.WriteLine("Error craete : " + e.Message);
                response.Results = e.Message;
            }

            response.Success = false;
            response.StatusCode = HttpStatusCode.BadRequest;
            return BadRequest(response);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateStudent(int id, [FromBody]StudentDto dto)
        {
            var response = new BaseResponse();

            if (!ModelState.IsValid)
            {
                response.Success = false;
                response.StatusCode = HttpStatusCode.BadRequest;
                response.Results = null;
                return BadRequest();
            }
            var entity = Mapper.Map<Student>(dto);
            try
            {
                int result = await _studentService.Update(entity);
                if (result > 0)
                {
                    response.Success = true;
                    response.StatusCode = HttpStatusCode.OK;
                    response.Results = result;
                    return Ok(response);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Error update : " + e.Message);
                response.Results = e.Message;
            }

            response.Success = false;
            response.StatusCode = HttpStatusCode.BadRequest;
            return BadRequest(response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteStudent(int id)
        {
            var response = new BaseResponse();

            try
            {
                int result = await _studentService.Delete(id);
                if (result > 0)
                {
                    response.Success = true;
                    response.StatusCode = HttpStatusCode.OK;
                    response.Results = result;
                    return Ok(response);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Error delete : " + e.Message);
                response.Results = e.Message;
            }

            response.Success = false;
            response.StatusCode = HttpStatusCode.BadRequest;
            return BadRequest(response);
        }

    }
}
