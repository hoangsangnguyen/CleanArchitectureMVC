﻿using Service.DepartmentService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using Entity;
using AutoMapper;
using ServiceStack;
using Backend.ServiceModel.Department;
using Backend.ServiceModel;

namespace Backend.ServiceInterface
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
            var classEntities = await _departmentService.GetAll();
            var dtos = classEntities.ToList().ConvertAll(x => x.ConvertTo<DepartmentDto>());

            return new
            {
                Success = true,
                StatusCode = (int)HttpStatusCode.OK,
                Results = dtos,
                ItemCount = dtos.Count
            };
        }

        public async Task<object> Get(DepartmentDto request)
        {
            var response = new BaseResponse();

            var entity = await _departmentService.GetById(request.Id);
            var dto = entity.ConvertTo<DepartmentDto>();
            response.Success = true;
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = dto;

            return response;
        }

        public async Task<object> Post(CreateDepartment request)
        {
            var response = new BaseResponse();
            var entity = request.ConvertTo<Department>();
            var result = await _departmentService.Create(entity);
            response.Success = true;
            response.StatusCode = (int)HttpStatusCode.Created;
            response.Message = "Create department success";
            response.Results = result;
            return response;
        }

        public async Task<object> Put(UpdateDepartment request)
        {
            var response = new BaseResponse();
            var entity = await _departmentService.GetById(request.Id);
            request.ToEntity(entity);
            var result = await _departmentService.Update(entity);
            response.Success = true;
            response.Message = "Update department success";
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = result.ConvertTo<DepartmentDto>();
            return response;
        }

        public async Task<object> Delete(DepartmentById request)
        {
            var response = new BaseResponse();

            var result = await _departmentService.Delete(request.Id);
            response.Success = true;
            response.Message = $"Delete department with id {request.Id} success";
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = result.ConvertTo<DepartmentDto>();

            return response;
        }
    }
}
