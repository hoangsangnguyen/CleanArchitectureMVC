using Service.DepartmentService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServiceStack.API.ServiceModel.Department;
using System.Net;
using ServiceStack.API.ServiceModel;
using Entity;
using AutoMapper;

namespace ServiceStack.API.ServiceInterface
{
    public class DepartmentApiService : BaseService
    {
        private readonly IDepartmentService _departmentService;

        public DepartmentApiService(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }

        public async Task<object> Get(GetDepartments request)
        {
            try
            {
                var entities = await _departmentService.GetAll();
                var dtos = entities.ToList().ConvertAll(x => x.ConvertTo<DepartmentDto>());
                return new
                {
                    Success = true,
                    StatusCode = HttpStatusCode.OK,
                    Results = dtos,
                    ItemCount = dtos.Count
                };
            }
            catch (WebServiceException webEx)
            {
                Console.WriteLine("Get all department error : " + webEx.ErrorMessage);
                return new
                {
                    Success = false,
                    StatusCode = webEx.StatusCode,
                    Message = webEx.ErrorMessage,
                    ItemCount = 0
                };
            }
        }

        public async Task<object> Get(DepartmentById request)
        {
            var response = new BaseResponse();

            try
            {
                var entity = await _departmentService.GetById(request.Id);
                var dto = entity.ConvertTo<DepartmentDto>();
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

        public async Task<object> Post(CreateDepartment request)
        {
            var response = new BaseResponse();
            try
            {
                var entity = request.ConvertTo<Department>();
                var result = await _departmentService.Create(entity);
                response.Success = true;
                response.StatusCode = HttpStatusCode.Created.ConvertTo<int>();
                response.Message = "Create department success";
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

        public async Task<object> Put(UpdateDepartment request)
        {
            var response = new BaseResponse();
            try
            {
                var entity = await _departmentService.GetById(request.Id);
                Mapper.Map(request, entity);
                var result = await _departmentService.Update(entity);
                response.Success = true;
                response.Message = "Update department success";
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

        public async Task<object> Delete(DepartmentById request)
        {
            var response = new BaseResponse();
            try
            {
                var result = await _departmentService.Delete(request.Id);
                response.Success = true;
                response.Message = $"Delete department with id {request.Id} success";
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
