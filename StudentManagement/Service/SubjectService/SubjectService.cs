using DAL.UnitOfWork;
using Entity;
using Service.BaseService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.SubjectService
{
    public class SubjectService : BaseService<Subject>, ISubjectService
    {
        public SubjectService(IUnitOfWork<Subject> unitOfWork) : base(unitOfWork)
        {
        }
    }
}
