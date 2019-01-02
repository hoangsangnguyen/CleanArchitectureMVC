using System.Linq;
using Autofac;
using Backend.ServiceInterface;
using DAL.Database;
using DAL.Repository;
using DAL.Repository.Classes;
using DAL.Repository.Departments;
using DAL.Repository.Students;
using DAL.Repository.Teachers;
using DAL.UnitOfWork;
using Entity;
using Funq;
using Microsoft.EntityFrameworkCore;
using Service.BaseService;
using Service.ClassService;
using Service.DepartmentService;
using Service.ScoreService;
using Service.StudentService;
using Service.SubjectService;
using Service.TeacherService;
using Service.UserService;
using ServiceStack;
using ServiceStack.API.ServiceInterface.Utils;
using ServiceStack.Auth;
using ServiceStack.Caching;
using ServiceStack.Configuration;
using ServiceStack.Data;
using ServiceStack.OrmLite;

namespace Backend
{
    //VS.NET Template Info: https://servicestack.net/vs-templates/EmptyAspNet
    public class AppHost : AppHostBase
    {
        /// <summary>
        /// Base constructor requires a Name and Assembly where web service implementation is located
        /// </summary>
        public AppHost()
            : base("ServiceStack.API", typeof(BaseService).Assembly) { }

        /// <summary>
        /// Application specific configuration
        /// This method should initialize any IoC resources utilized by your web service classes.
        /// </summary>
        public override void Configure(Container container)
        {
            AppSettings = new AppSettings();
            this.Plugins.Add(new CorsFeature(allowedOrigins: "*",
                                            allowedMethods: "GET, POST, PUT, DELETE, OPTIONS",
                                            allowedHeaders: "Content-Type, Access-Control-Allow-Origin, Authorization",
                                            allowCredentials: true));

            var builder = new ContainerBuilder();

            // Register Database context
            builder.Register(c =>
            {
                var contextOption = new DbContextOptionsBuilder<StudentContext>()
               .UseSqlServer(AppSettings.GetString("ConnectionString"), b => b.MigrationsAssembly("ServiceStack.API"))
               .Options;
                return new StudentContext(contextOption);
            }).InstancePerRequest();

            // Register repository
            builder
               .RegisterGeneric(typeof(Repository<>))
               .As(typeof(IRepository<>))
               .InstancePerRequest();

            // register UnitofWork
            builder
               .RegisterGeneric(typeof(UnitOfWork<>))
               .As(typeof(IUnitOfWork<>))
               .InstancePerDependency();

            // Register Service
            builder.RegisterAssemblyTypes(typeof(IBaseService<>).Assembly)
               .Where(t => t.Name.EndsWith("Service"))
               .AsImplementedInterfaces().InstancePerRequest();

            IContainerAdapter adapter = new AutofacIocAdapter(builder.Build(), container);
            container.Adapter = adapter;

            //seed data

            var db = container.Resolve<StudentContext>();
            if (!db.Users.Any())
            {
                new SaltedHash().GetHashAndSaltString("123456", out string hashedPassword, out string salt);

                db.Users.AddAsync(new User
                {
                    FirstName = "Nguyễn",
                    LastName = "Sang",
                    DisplayName = "Sang Nguyễn",
                    UserName = "sangnguyen",
                    Password = hashedPassword,
                    Salt = salt,
                    RoleId = "admin"
                });
                db.SaveChanges();
            }

            this.Plugins.Add(new AuthFeature(() => new AuthUserSession(), new IAuthProvider[]
            {
                //new CustomJwtAuthProvider(container.Resolve<IUserService>())
                new JwtAuthProvider(AppSettings),
                new CustomCredentialsProvider(container.Resolve<IUserService>())
            }));

            //this.Plugins.Add(new RegistrationFeature());

            var userRep = new InMemoryAuthRepository();
            container.Register<IUserAuthRepository>(userRep);

            container.Register<ICacheClient>(new MemoryCacheClient());

            //string hash;
            //string salt;
            //new SaltedHash().GetHashAndSaltString("password", out hash, out salt);
        }
    }
}