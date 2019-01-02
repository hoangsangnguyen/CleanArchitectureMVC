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
    }
}
