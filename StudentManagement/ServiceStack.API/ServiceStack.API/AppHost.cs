using API.AutoMapper;
using Autofac;
using DAL.Database;
using DAL.Repository;
using DAL.UnitOfWork;
using Entity;
using Funq;
using Microsoft.EntityFrameworkCore;
using Service.StudentService;
using ServiceStack;
using ServiceStack.API.ServiceInterface;
using ServiceStack.Configuration;
using ServiceStack.Data;
using ServiceStack.OrmLite;

namespace ServiceStack.API
{
    //VS.NET Template Info: https://servicestack.net/vs-templates/EmptyAspNet
    public class AppHost : AppHostBase
    {
        /// <summary>
        /// Base constructor requires a Name and Assembly where web service implementation is located
        /// </summary>
        public AppHost()
            : base("ServiceStack.API", typeof(MyServices).Assembly) { }

        /// <summary>
        /// Application specific configuration
        /// This method should initialize any IoC resources utilized by your web service classes.
        /// </summary>
        public override void Configure(Container container)
        {
            //Config examples
            this.Plugins.Add(new PostmanFeature());
            this.Plugins.Add(new CorsFeature());

            var builder = new ContainerBuilder();

            var contextOption = new DbContextOptionsBuilder<StudentContext>()
                .UseSqlServer(AppSettings.GetString("ConnectionString"), b => b.MigrationsAssembly("ServiceStack.API"))
                .Options;
            builder.RegisterInstance(new StudentContext(contextOption)).As<StudentContext>().SingleInstance();
            builder
                .RegisterGeneric(typeof(Repository<>))
                .As(typeof(IRepository<>))
                .InstancePerDependency();
            builder.RegisterType<StudentRepository>().As<IStudentRepository>();
            builder
               .RegisterGeneric(typeof(UnitOfWork<>))
               .As(typeof(IUnitOfWork<>))
               .InstancePerDependency();
            builder.RegisterType<StudentService>().As<IStudentService>();

            IContainerAdapter adapter = new AutofacIocAdapter(builder.Build());
            container.Adapter = adapter;

            AutoMapperConfiguration.Config();
        }
    }
}