using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace Backend.ServiceInterface
{
    [Authenticate]
   public class BaseService : ServiceStack.Service
   {
        public bool IsAdminOrOwner(string userName)
        {
            var userSession = base.SessionAs<AuthUserSession>();
            if (userSession.Roles.Contains(RoleEnum.Admin.ToDescription()))
                return true;
            var userNameSession =  userSession.UserAuthName;
            return userName == userNameSession;
        }

        public bool IsAdminOrManagerOrOwner(string userName, string roleId)
        {
            var userSession = base.SessionAs<AuthUserSession>();
            if (userSession.Roles.Contains(RoleEnum.Admin.ToDescription())  // is admin
                || (userSession.Roles.Contains(RoleEnum.Manager.ToDescription())) && !roleId.Equals(RoleEnum.Manager.ToDescription())) // is manager changing role of teacher or student
                return true;
            var userNameSession = userSession.UserAuthName;
            return userName == userNameSession;
        }

        public bool IsUserValidRole(string role)
        {
            var userSession = base.SessionAs<AuthUserSession>();
            if (userSession.Roles.Contains((RoleEnum.Admin.ToDescription()))) return true;
            if (userSession.Roles.Contains(RoleEnum.Manager.ToDescription()))
            {
                if (role.Equals(RoleEnum.Admin.ToDescription())
                    || role.Equals((RoleEnum.Manager.ToDescription())))
                {
                    return false;
                }

                return true;
            }

            return false;
        }
   }
  
}
