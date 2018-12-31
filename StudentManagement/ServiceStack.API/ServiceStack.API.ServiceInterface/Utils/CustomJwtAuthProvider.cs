using Entity;
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
    public class CustomJwtAuthProvider : JwtAuthProvider
    {
        private readonly IUserService _userService;

        public CustomJwtAuthProvider(IUserService userService)
        {
            _userService = userService;
        }

        protected override IHttpResult ValidateAccount(IServiceBase authService, IAuthRepository authRepo, IAuthSession session, IAuthTokens tokens)
        {
            return base.ValidateAccount(authService, authRepo, session, tokens);
        }

        //public override bool IsAuthorized(IAuthSession session, IAuthTokens tokens, Authenticate request = null)
        //{
        //    Task<User> task = Task.Run<User>(async () => await _userService.GetUserByUserName(request.UserName));
        //    return new SaltedHash().VerifyHashString(request.Password, task.Result.Password, task.Result.Salt);
        //    //return base.IsAuthorized(session, tokens, request);
        //}

        public override IHttpResult OnAuthenticated(IServiceBase authService, IAuthSession session, IAuthTokens tokens, Dictionary<string, string> authInfo)
        {
            return base.OnAuthenticated(authService, session, tokens, authInfo);
        }
    }
}
