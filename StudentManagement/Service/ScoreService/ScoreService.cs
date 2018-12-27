﻿using DAL.UnitOfWork;
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

        public override Task<Score> GetById(object request)
        {
            throw new NullReferenceException();
            //var entity = await _unitOfWork.Repository.GetAll().FirstAsync(x => x.StudentId == (int)request.StudentId);
        }

        public async Task<Score> GetById(int SubjectId, int StudentId)
        {
            var entity = await _unitOfWork.Repository.GetAll().FirstAsync(x => x.StudentId == StudentId && x.SubjectId == SubjectId);
            return entity;
        }

        public async override Task<IEnumerable<Score>> GetAll()
        {
            var entities = await _unitOfWork.Repository.GetAll().Include("Student").Include("Subject").ToListAsync();

            return entities;
        }

        public async Task<Score> Delete(int SubjectId, int StudentId)
        {
            var entity = await _unitOfWork.Repository.GetAll().Where(x => x.StudentId == StudentId && x.SubjectId == SubjectId).FirstAsync();
            return await base.Delete(entity);
        }
    }
}
