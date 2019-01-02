﻿using DAL.UnitOfWork;
using Entity;
using Microsoft.EntityFrameworkCore;
using Service.BaseService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.StudentService
{
    public class StudentService : BaseService<Student>, IStudentService
    {
        public StudentService(IUnitOfWork<Student> unitOfWork) : base(unitOfWork)
        {
        }

        public override async Task<IEnumerable<object>> GetModelsWithKeys(params string[] keys)
        {
            var models = await _unitOfWork.Repository.GetAll().Select(
                x => new
                {
                    Id = x.Id,
                    Name = x.FirstName + " " + x.LastName
                }).ToListAsync();
            return models;
        }
    }
}
