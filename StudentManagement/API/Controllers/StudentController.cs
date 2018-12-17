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
            var studentEntities = await _studentService.GetAll();
            var dtos = Mapper.Map<IEnumerable<StudentDto>>(studentEntities);
            return Ok(dtos);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentDto>> GetStudentById(int id)
        {
            try
            {
                var entity = await _studentService.GetById(id);
                if (entity == null) {
                    return NotFound();
                }
                var dto = Mapper.Map<StudentDto>(entity);
                return Ok(dto);

            } catch (Exception e)
            {
                Console.WriteLine("Error GET STUDENT BY ID : " + e.Message);
                return NotFound();
            }
        }

        [HttpPost]
        [EnableCors("AllowSpecificOrigin")]
        public async Task<ActionResult> CreateStudent([FromBody]StudentForCreation dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var entity = Mapper.Map<Student>(dto);
            try
            {
                int response = await _studentService.Create(entity);
                if (response > 0)
                {
                    return CreatedAtAction("GetStudentById", new { id = response }, new { id = response});
                }

                return NoContent();
            }
            catch (Exception e)
            {
                Console.WriteLine("Error craete : " + e.Message);
                return NoContent();
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateStudent(int id, [FromBody]StudentDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var entity = Mapper.Map<Student>(dto);
            try
            {
                int response = await _studentService.Update(entity);
                if (response > 0)
                {
                    return Ok();
                }

                return NoContent();
            }
            catch (Exception e)
            {
                Console.WriteLine("Error update : " + e.Message);
                return NoContent();
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteStudent(int id)
        {
            try
            {
                int response = await _studentService.Delete(id);
                if (response > 0)
                {
                    return Ok();
                }

                return NoContent();
            }
            catch (Exception e)
            {
                Console.WriteLine("Error delete : " + e.Message);
                return NoContent();
            }
        }

    }
}
