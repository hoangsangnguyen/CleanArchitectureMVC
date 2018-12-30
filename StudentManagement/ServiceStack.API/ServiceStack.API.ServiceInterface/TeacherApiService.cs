using AutoMapper;
using Backend.ServiceModel;
using Backend.ServiceModel.Teacher;
using Entity;
using Service.TeacherService;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Backend.ServiceInterface
{
    public class TeacherApiService : BaseService
    {
        private readonly ITeacherService _teacherService;

        public TeacherApiService(ITeacherService teacherService)
        {
            _teacherService = teacherService;
        }

        public async Task<object> Get(GetTeachers request)
        {
            var teacherEntities = await _teacherService.GetAll();
            var dtos = teacherEntities.ToList().ConvertAll(x =>
            {
                var dto = x.ConvertTo<TeacherDto>();
                dto.DepartmentName = x.Department.Name;
                dto.SubjectName = x.Subject?.Name;
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

        public async Task<object> Get(TeacherById request)
        {
            var response = new BaseResponse();

            var entity = await _teacherService.GetById(request.Id);
            var dto = entity.ConvertTo<TeacherDto>();
            response.Success = true;
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = dto;

            return response;
        }

        [RequiresAnyRole("admin", "manager")]
        public async Task<object> Post(CreateTeacher request)
        {
            var response = new BaseResponse();
            var entity = request.ConvertTo<Teacher>();
            var result = await _teacherService.Create(entity);
            response.Success = true;
            response.StatusCode = (int)HttpStatusCode.Created;
            response.Message = "Create teacher success";
            response.Results = result;
            return response;
        }
        [RequiresAnyRole("admin", "manager")]
        public async Task<object> Put(UpdateTeacher request)
        {
            var response = new BaseResponse();
            var entity = await _teacherService.GetById(request.Id);
            request.ToEntity(entity);
            var result = await _teacherService.Update(entity);
            response.Success = true;
            response.Message = "Update teacher success";
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = result;
            return response;
        }
        [RequiresAnyRole("admin", "manager")]
        public async Task<object> Delete(TeacherById request)
        {
            var response = new BaseResponse();

            var result = await _teacherService.Delete(request.Id);
            response.Success = true;
            response.Message = $"Delete teacher with id {request.Id} success";
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = result.ConvertTo<TeacherDto>();

            return response;
        }
    }
}
