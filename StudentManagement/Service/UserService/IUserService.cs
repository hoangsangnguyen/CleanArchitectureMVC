using Entity;
using Service.BaseService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.UserService
{
    public interface IUserService : IBaseService<User>
    {
        Task<User> Login(string userName, string password);
        Task<User> GetUserByUserName(string userName);
    }
}
