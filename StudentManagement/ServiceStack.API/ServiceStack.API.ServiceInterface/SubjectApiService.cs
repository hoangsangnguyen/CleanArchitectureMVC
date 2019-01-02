using Backend.ServiceModel;
using Backend.ServiceModel.Subject;
using Entity;
using Service.SubjectService;
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
    public class SubjectApiService : BaseService
    {
        private readonly ISubjectService _subjectService;

        public SubjectApiService(ISubjectService subjectService)
        {
            _subjectService = subjectService;
        }

        public async Task<object> Get(GetSubjects request)
        {
            Expression<Func<Subject, bool>> filter = null;
            if (!request.Name.IsNullOrEmpty())
                filter = x => x.Name.Contains(request.Name);

            var subjectEntities = await _subjectService.GetAll(filter: filter);
            var dtos = subjectEntities.ToList().ConvertAll(x => x.ConvertTo<SubjectDto>());
            return new
            {
                Success = true,
                StatusCode = (int)HttpStatusCode.OK,
                Results = dtos,
                ItemCount = dtos.Count
            };
        }

        public async Task<object> Get(SubjectById request)
        {
            var response = new BaseResponse();
            Expression<Func<Subject, bool>> keySelector = x => x.Id == request.Id;

            var entity = await _subjectService.GetById(keySelector: keySelector);
            var dto = entity.ConvertTo<SubjectDto>();
            response.Success = true;
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = dto;

            return response;
        }
        //[RequiresAnyRole("admin", "manager")]
        public async Task<object> Post(CreateSubject request)
        {
            var response = new BaseResponse();
            var entity = request.ConvertTo<Subject>();
            var result = await _subjectService.Create(entity);
            response.Success = true;
            response.StatusCode = (int)HttpStatusCode.Created;
            response.Message = "Create subject success";
            response.Results = result;
            return response;
        }
        //[RequiresAnyRole("admin", "manager")]
        public async Task<object> Put(UpdateSubject request)
        {
            var response = new BaseResponse();
            Expression<Func<Subject, bool>> keySelector = x => x.Id == request.Id;
            var entity = await _subjectService.GetById(keySelector: keySelector);
            request.ToEntity(entity);
            var result = await _subjectService.Update(entity);
            response.Success = true;
            response.Message = "Update subject succees";
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = result;
            return response;
        }
        //[RequiresAnyRole("admin", "manager")]
        public async Task<object> Delete(SubjectById request)
        {
            var response = new BaseResponse();
            Expression<Func<Subject, bool>> keySelector = x => x.Id == request.Id;
            var result = await _subjectService.Delete(keySelector: keySelector);
            response.Success = true;
            response.Message = $"Delete subject with id {request.Id} success";
            response.StatusCode = HttpStatusCode.OK.ConvertTo<int>();
            response.Results = result.ConvertTo<SubjectDto>();

            return response;
        }
    }
}
