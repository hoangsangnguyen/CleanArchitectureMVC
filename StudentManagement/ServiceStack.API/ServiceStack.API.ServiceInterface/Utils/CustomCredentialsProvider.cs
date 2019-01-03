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
            Task<User> task = Task.Run<User>(async () => await _userService.GetUserByUserName(userName));
            return new SaltedHash().VerifyHashString(password, task.Result.Password, task.Result.Salt);
        }

        public async Task<User> GetUser(string userName, string password)
        {
            var user = await _userService.Login(userName, password);
            return user;
        }

        public override IHttpResult OnAuthenticated(IServiceBase authService, IAuthSession session, IAuthTokens tokens, Dictionary<string, string> authInfo)
        {
            return base.OnAuthenticated(authService, session, tokens, authInfo);
        }

        public override object Authenticate(IServiceBase authService, IAuthSession session, Authenticate request)
        {
            var authenticate = base.Authenticate(authService, session, request) as AuthenticateResponse;
            Task<User> task = Task.Run<User>(async () => await _userService.GetUserByUserName(authenticate.UserName));
            var user = task.Result;
            authenticate.DisplayName = user.DisplayName;
            authenticate.UserId = user.Id.ToString();
            var meta = new Dictionary<string, string>
            {
                {"Role", user.Role.SystemName},
            };

            authenticate.Meta = meta;

            return authenticate;
        }
    }
}
