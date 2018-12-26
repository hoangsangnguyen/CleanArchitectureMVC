using AutoMapper;
using Entity;
using Service.ClassService;
using ServiceStack.API.ServiceModel;
using ServiceStack.API.ServiceModel.Class;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ServiceStack.API.ServiceInterface
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

            var entities = await _classService.GetAll();
            var dtos = entities.ToList().ConvertAll(x => x.ConvertTo<ClassDto>());
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
            var response = new BaseResponse();

            var entity = await _classService.GetById(request.Id);
            var dto = entity.ConvertTo<ClassDto>();
            response.Success = true;
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = dto;
            return response;
        }

        public async Task<object> Post(CreateClass request)
        {
            var response = new BaseResponse();
            try
            {
                var entity = request.ConvertTo<Class>();
                var result = await _classService.Create(entity);
                response.Success = true;
                response.StatusCode = HttpStatusCode.Created.ConvertTo<int>();
                response.Message = "Create class success";
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

        public async Task<object> Put(UpdateClass request)
        {
            var response = new BaseResponse();
            try
            {
                var entity = await _classService.GetById(request.Id);
                Mapper.Map(request, entity);
                var result = await _classService.Update(entity);
                response.Success = true;
                response.Message = "Update class success";
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

        public async Task<object> Delete(ClassById request)
        {
            var response = new BaseResponse();
            try
            {
                var result = await _classService.Delete(request.Id);
                response.Success = true;
                response.Message = $"Delete class with id {request.Id} success";
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
