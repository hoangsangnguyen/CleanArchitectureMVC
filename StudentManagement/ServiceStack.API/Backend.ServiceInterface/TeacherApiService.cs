﻿using AutoMapper;
using Backend.ServiceModel;
using Backend.ServiceModel.Teacher;
using Entity;
using Service.TeacherService;
using ServiceStack;
using ServiceStack.API.ServiceInterface;
using ServiceStack.API.ServiceModel.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Backend.ServiceInterface
{
    public class TeacherApiService : BaseService
    {
        private readonly ITeacherService _teacherService;
        private readonly UserApiService _userApiService;

        public TeacherApiService(ITeacherService teacherService, UserApiService userApiService)
        {
            _teacherService = teacherService;
            _userApiService = userApiService;
        }

        public async Task<object> Get(GetTeachers request)
        {
            Expression<Func<Teacher, bool>> filter = x => (request.FirstName == null || x.FirstName.Contains(request.FirstName))
                                                      && (request.LastName == null || x.LastName.Contains(request.LastName))
                                                      && (request.IsManager == null || x.IsManager == request.IsManager)
                                                      && (request.DepartmentId == null || x.DepartmentId == request.DepartmentId);

            var teacherEntities = await _teacherService.GetAll(filter: filter, includeProperties: "Department,Subject");
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
            Expression<Func<Teacher, bool>> keySelector = x => x.Id == request.Id;

            var entity = await _teacherService.GetById(keySelector: keySelector);
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

            if (request.CreateNewUserLogin)
            {
                var userLogin = new CreateUser()
                {
                    FirstName = entity.FirstName,
                    LastName = entity.LastName,
                    DisplayName = entity.FirstName + " " + entity.LastName,
                    UserName = entity.FirstName.ToLower() + entity.LastName.ToLower(),
                    Password = entity.FirstName.ToLower() + entity.LastName.ToLower(),
                    RoleId = RoleEnum.Teacher.ToDescription()
                };
                await _userApiService.Post(userLogin);
            }

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
            Expression<Func<Teacher, bool>> keySelector = x => x.Id == request.Id;
            var entity = await _teacherService.GetById(keySelector: keySelector);
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
            Expression<Func<Teacher, bool>> keySelector = x => x.Id == request.Id;
            var result = await _teacherService.Delete(keySelector: keySelector);
            response.Success = true;
            response.Message = $"Delete teacher with id {request.Id} success";
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = result.ConvertTo<TeacherDto>();

            return response;
        }
    }
}
