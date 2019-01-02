using Backend.ServiceModel;
using Backend.ServiceModel.Score;
using Entity;
using Service.ScoreService;
using ServiceStack;
using ServiceStack.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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
            Expression<Func<Score, bool>> filter = x => (request.StudentId == null || x.StudentId == request.StudentId)
                                                        && (request.SubjectId == null || x.SubjectId == request.SubjectId)
                                                        && (request.Mark == null || x.Mark == request.Mark);

            var scoreEntities = await _scoreService.GetAll(filter: filter, includeProperties: "Student,Subject");
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
            Expression<Func<Score, bool>> keySelector = x => x.StudentId == request.StudentId && x.SubjectId == request.SubjectId;

            var entity = await _scoreService.GetById(keySelector: keySelector);
            var dto = entity.ConvertTo<ScoreDto>();
            response.Success = true;
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = dto;

            return response;
        }

        //[RequiresAnyRole("admin", "manager")]
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
        //[RequiresAnyRole("admin", "manager")]
        public async Task<object> Put(UpdateScore request)
        {
            var response = new BaseResponse();
            Expression<Func<Score, bool>> keySelector = x => x.StudentId == request.StudentId && x.SubjectId == request.SubjectId;
            var entity = await _scoreService.GetById(keySelector: keySelector);
            request.ToEntity(entity);
            var result = await _scoreService.Update(entity);
            response.Success = true;
            response.Message = "Update score success";
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = result.ConvertTo<ScoreDto>();
            return response;
        }
        //[RequiresAnyRole("admin", "manager")]
        public async Task<object> Delete(ScoreById request)
        {
            var response = new BaseResponse();
            Expression<Func<Score, bool>> keySelector = x => x.StudentId == request.StudentId && x.SubjectId == request.SubjectId;
            var result = await _scoreService.Delete(keySelector: keySelector);
            response.Success = true;
            response.Message = $"Delete score with SubjectId {request.SubjectId} and StudentId {request.StudentId} success";
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Results = result.ConvertTo<ScoreDto>();

            return response;
        }

    }
}
