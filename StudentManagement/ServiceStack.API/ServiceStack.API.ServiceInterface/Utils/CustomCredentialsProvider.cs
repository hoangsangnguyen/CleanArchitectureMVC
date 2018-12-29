using Entity;
using Service.TeacherService;
using Service.UserService;
using ServiceStack.Auth;
using ServiceStack.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceStack.API.ServiceInterface.Utils
{
    public class CustomCredentialsProvider : CredentialsAuthProvider
    {
        private readonly IUserService _userService;
        public CustomCredentialsProvider(IUserService userService)
        {
            _userService = userService;
        }
        public override bool TryAuthenticate(IServiceBase authService, string userName, string password)
        {
            Task<User> task = Task.Run<User>(async () => await _userService.Login(userName, password));
            return userName.EqualsIgnoreCase(task.Result.UserName)  && password.Equals(task.Result.Password);
        }

        public async Task<User> GetUser(string userName, string password)
        {
            var user = await _userService.Login(userName, password);
            return user;
        }

        public override IHttpResult OnAuthenticated(IServiceBase authService, IAuthSession session, IAuthTokens tokens, Dictionary<string, string> authInfo)
        {
            Console.WriteLine("USER NAME : " + session.UserAuthName);

            Task<User> task = Task.Run<User>(async () => await _userService.GetUserByUserName(session.UserAuthName));
            var user = task.Result;
            session.DisplayName = user.DisplayName;
            session.Roles = new List<string> { user.Role.SystemName };
            return base.OnAuthenticated(authService, session, tokens, authInfo);
        }
    }
}
