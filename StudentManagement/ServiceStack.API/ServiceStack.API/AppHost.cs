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
using ServiceStack;
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
            this.Plugins.Add(new CorsFeature());

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

            this.Plugins.Add(new AuthFeature(() => new AuthUserSession(), new IAuthProvider[]
            {
                new JwtAuthProvider(AppSettings) { AuthKey = AesUtils.CreateKey()},
                new CredentialsAuthProvider(AppSettings)
            }));

            this.Plugins.Add(new RegistrationFeature());

            container.Register<ICacheClient>(new MemoryCacheClient());

            //container.Register<IDbConnectionFactory>(c =>
            //    new OrmLiteConnectionFactory(AppSettings.GetString("ConnectionString"), SqlServerDialect.Provider));

            //container.Register<IAuthRepository>(c =>
            //    new OrmLiteAuthRepository(c.Resolve<IDbConnectionFactory>()));

            //container.Resolve<IAuthRepository>().InitSchema();


            var userRep = GetAuthRepository();
            userRep.CreateUserAuth(new UserAuth
            {
                Id = 1,
                UserName = "sang",
                DisplayName = "hoang sang",
            }, "123");
            container.Register<IAuthRepository>(userRep);
        }
    }
}