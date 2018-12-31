using Backend.ServiceModel;
using Backend.ServiceModel.Score;
using Entity;
using Service.ScoreService;
using ServiceStack;
using ServiceStack.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Backend.ServiceInterface
{
    public class ScoreApiService : BaseService
    {
        private readonly IScoreService _scoreService;

        public ScoreApiService(IScoreService scoreService)
        {
            _scoreService = scoreService;
        }

        public async Task<object> Get(GetScores request)
        {
            var scoreEntities = await _scoreService.GetAll(includeProperties: "student, subject");
            var dtos = scoreEntities.ToList().ConvertAll(x =>
            {
                var dto = x.ConvertTo<ScoreDto>();
                dto.StudentName = x.Student?.FirstName + x.Student?.LastName;
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

        public async Task<object> Get(ScoreById request)
        {
            var response = new BaseResponse();

            var entity = await _scoreService.GetById(new { SubjectId = request.SubjectId, StudentId = request.StudentId});
            var dto = entity.ConvertTo<ScoreDto>();
            response.Success = true;
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = dto;

            return response;
        }

        [RequiresAnyRole("admin", "manager")]
        public async Task<object> Post(CreateScore request)
        {
            var response = new BaseResponse();
            var entity = request.ConvertTo<Score>();
            var result = await _scoreService.Create(entity);
            response.Success = true;
            response.StatusCode = (int)HttpStatusCode.Created;
            response.Message = "Create score success";
            response.Results = result;
            return response;
        }
        [RequiresAnyRole("admin", "manager")]
        public async Task<object> Put(UpdateScore request)
        {
            var response = new BaseResponse();
            var entity = await _scoreService.GetById(request.SubjectId, request.StudentId);
            request.ToEntity(entity);
            var result = await _scoreService.Update(entity);
            response.Success = true;
            response.Message = "Update score success";
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = result.ConvertTo<ScoreDto>();
            return response;
        }
        [RequiresAnyRole("admin", "manager")]
        public async Task<object> Delete(ScoreById request)
        {
            var response = new BaseResponse();

            var result = await _scoreService.Delete(request.SubjectId, request.StudentId);
            response.Success = true;
            response.Message = $"Delete score with SubjectId {request.SubjectId} and StudentId {request.StudentId} success";
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = result.ConvertTo<ScoreDto>();

            return response;
        }
      
    }
}
