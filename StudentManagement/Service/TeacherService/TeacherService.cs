using DAL.UnitOfWork;
using Entity;
using Microsoft.EntityFrameworkCore;
using Service.BaseService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.TeacherService
{
    public class TeacherService : BaseService<Teacher>, ITeacherService
    {
        public TeacherService(IUnitOfWork<Teacher> unitOfWork) : base(unitOfWork)
        {
        }
        public async override Task<IEnumerable<Teacher>> GetAll()
        {
            var entities = await _unitOfWork.Repository.GetAll().Include("Department").Include("Subject").ToListAsync();

            return entities;
        }

    }
}
