using Entity;
using Service.SubjectService;
using ServiceStack.API.ServiceModel;
using ServiceStack.API.ServiceModel.Subject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ServiceStack.API.ServiceInterface
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
            var subjectEntities = await _subjectService.GetAll();
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

            var entity = await _subjectService.GetById(request.Id);
            var dto = entity.ConvertTo<SubjectDto>();
            response.Success = true;
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = dto;

            return response;
        }

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

        public async Task<object> Put(UpdateSubject request)
        {
            var response = new BaseResponse();
            var entity = await _subjectService.GetById(request.Id);
            request.ToEntity(entity);
            var result = await _subjectService.Update(entity);
            response.Success = true;
            response.Message = "Update subject succees";
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = result;
            return response;
        }

        public async Task<object> Delete(SubjectById request)
        {
            var response = new BaseResponse();

            var result = await _subjectService.Delete(request.Id);
            response.Success = true;
            response.Message = $"Delete subject with id {request.Id} success";
            response.StatusCode = HttpStatusCode.OK.ConvertTo<int>();
            response.Results = result.ConvertTo<SubjectDto>();

            return response;
        }
    }
}
