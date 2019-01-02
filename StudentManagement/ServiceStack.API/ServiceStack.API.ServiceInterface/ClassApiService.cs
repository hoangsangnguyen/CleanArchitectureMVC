using AutoMapper;
using Backend.ServiceModel;
using Backend.ServiceModel.Class;
using Entity;
using Service.ClassService;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Backend.ServiceInterface
{
    public class ClassApiService : BaseService
    {
        private readonly IClassService _classService;

        public ClassApiService(IClassService classService)
        {
            _classService = classService;
        }

        public async Task<object> Get(GetClasses request)
        {
            Expression<Func<Class, bool>> filter = x => (request.Name == null || x.Name.Contains(request.Name))
                                                        && (request.DepartmentId == null || x.DepartmentId == request.DepartmentId);
            var classEntities = await _classService.GetAll(filter: filter, includeProperties: "Department");
            var dtos = classEntities.ToList().ConvertAll(x =>
            {
                var dto = x.ConvertTo<ClassDto>();
                dto.DepartmentName = x.Department.Name;
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

        public async Task<object> Get(ClassById request)
        {
            var entity = await _classService.GetById(request.Id);
            var dto = entity.ConvertTo<ClassDto>();

            return new
            {
                Success = true,
                StatusCode = (int)HttpStatusCode.OK,
                Results = dto,
            };
        }

        public async Task<object> Get(ClassesViewNameId request)
        {
            var models = await _classService.GetModelsWithKeys("Id", "Name");
            return models;
        }

        //[RequiresAnyRole("admin", "manager")]
        public async Task<object> Post(CreateClass request)
        {
            var response = new BaseResponse();
            var entity = request.ConvertTo<Class>();
            var result = await _classService.Create(entity);
            response.Success = true;
            response.StatusCode = (int)HttpStatusCode.Created;
            response.Message = "Create class success";
            response.Results = result;
            return response;
        }
        //[RequiresAnyRole("admin", "manager")]
        public async Task<object> Put(UpdateClass request)
        {
            var response = new BaseResponse();
            var entity = await _classService.GetById(request.Id);
            request.ToEntity(entity);
            var result = await _classService.Update(entity);
            response.Success = true;
            response.Message = "Update class success";
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = result.ConvertTo<ClassDto>();
            return response;
        }
        //[RequiresAnyRole("admin", "manager")]
        public async Task<object> Delete(ClassById request)
        {
            var response = new BaseResponse();

            var result = await _classService.Delete(request.Id);
            response.Success = true;
            response.Message = $"Delete class with id {request.Id} success";
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = result.ConvertTo<ClassDto>();

            return response;
        }
    }
}
