using DAL.UnitOfWork;
using Entity;
using Microsoft.EntityFrameworkCore;
using Service.BaseService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.ScoreService
{
    public class ScoreService : BaseService<Score>, IScoreService
    {
        public ScoreService(IUnitOfWork<Score> unitOfWork) : base(unitOfWork)
        {
        }

        public async Task<Score> GetById(int SubjectId, int StudentId)
        {
            var entity = await _unitOfWork.Repository.GetAll().FirstAsync(x => x.StudentId == StudentId && x.SubjectId == SubjectId);
            return entity;
        }

        public async Task<Score> Delete(int SubjectId, int StudentId)
        {
            var entity = await _unitOfWork.Repository.GetAll().Where(x => x.StudentId == StudentId && x.SubjectId == SubjectId).FirstAsync();
            return await base.Delete(entity);
        }
    }
}
