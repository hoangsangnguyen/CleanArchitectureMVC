using Service.StudentService;
using Service.TeacherService;
using ServiceStack;
using ServiceStack.Auth;
using ServiceStack.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.ServiceInterface.Utils
{
    public class CustomCredentialsAuthProvider : CredentialsAuthProvider
    {
        private readonly IStudentService _studentService;
        private readonly ITeacherService _teacherService;

        public CustomCredentialsAuthProvider()
        {
        }

        public override bool TryAuthenticate(IServiceBase authService,
        string userName, string password)
        {
            var result = _studentService.Login(userName, password);
            return result != null;
            //Add here your custom auth logic (database calls etc)
            //Return true if credentials are valid, otherwise false
        }

        public override IHttpResult OnAuthenticated(IServiceBase authService,
            IAuthSession session, IAuthTokens tokens,
            Dictionary<string, string> authInfo)
        {
            
            //Fill IAuthSession with data you want to retrieve in the app eg:
            session.FirstName = "some_firstname_from_db";
            //...

            //Call base method to Save Session and fire Auth/Session callbacks:
            return base.OnAuthenticated(authService, session, tokens, authInfo);

            //Alternatively avoid built-in behavior and explicitly save session with
            //authService.SaveSession(session, SessionExpiry);
            //return null;
        }
    }
}
