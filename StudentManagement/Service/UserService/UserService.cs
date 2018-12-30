﻿using DAL.UnitOfWork;
using Entity;
using Microsoft.EntityFrameworkCore;
using Service.BaseService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.UserService
{
    public class UserService : BaseService<User>, IUserService
    {
        public UserService(IUnitOfWork<User> unitOfWork) : base(unitOfWork)
        {
        }

        public async override Task<User> GetById(object id)
        {
            var user = await _unitOfWork.Repository.GetAll().Include("Role").FirstAsync(x => x.Id == (int)id);
            return user;
        }

        public async override Task<IEnumerable<User>> GetAll()
        {
            var users = await _unitOfWork.Repository.GetAll().Include("Role").ToListAsync();
            return users;
        }

        public async Task<User> GetUserByUserName(string userName)
        {
            var user = await _unitOfWork.Repository.GetAll().Include("Role").FirstAsync(x => x.UserName.Equals(userName));
            return user;
        }

        public async Task<User> Login(string userName, string password)
        {
            var user = await _unitOfWork.Repository.GetAll().Include("Role").FirstAsync(x => x.UserName.Equals(userName)
                                                                                                        && x.Password.Equals(password));
            return user;
        }
    }
}