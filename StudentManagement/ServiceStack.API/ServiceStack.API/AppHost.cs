using API.AutoMapper;
using Autofac;
using DAL.Database;
using DAL.Repository;
using DAL.Repository.Classes;
using DAL.Repository.Departments;
using DAL.UnitOfWork;
using Entity;
using Funq;
using Microsoft.EntityFrameworkCore;
using Service.BaseService;
using Service.ClassService;
using Service.DepartmentService;
using Service.StudentService;
using ServiceStack;
using ServiceStack.API.ServiceInterface;
using ServiceStack.API.ServiceModel;
using ServiceStack.Configuration;
using ServiceStack.Data;

namespace ServiceStack.API
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
            /*
             * //Config examples
            this.Plugins.Add(new PostmanFeature());
            this.Plugins.Add(new CorsFeature());

            var builder = new ContainerBuilder();

            var contextOption = new DbContextOptionsBuilder<StudentContext>()
                .UseSqlServer(AppSettings.GetString("ConnectionString"), b => b.MigrationsAssembly("ServiceStack.API"))
                .Options;
            //builder.Register(c => new StudentContext(contextOption)).InstancePerRequest();
            container.Register(c => new StudentContext(contextOption)).ReusedWithin(ReuseScope.Request);

            container.RegisterAutoWiredType(typeof(Repository<>), typeof(IRepository<>));
            //builder
            //    .RegisterGeneric(typeof(Repository<>))
            //    .As(typeof(IRepository<>))
            //    .InstancePerRequest();


            typeof(IRepository<>).Assembly.GetTypes()
                .Each(x => {
                    if (x.IsOrHasGenericInterfaceTypeOf(typeof(IRepository<>)))
                    container.RegisterAutoWiredType(x);
                });
            //builder.RegisterAssemblyTypes(typeof(IRepository).Assembly)
            //   .Where(t => t.Name.EndsWith("Repository"))
            //   .AsImplementedInterfaces().InstancePerRequest();

            container.RegisterAutoWiredType(typeof(UnitOfWork<>), typeof(IUnitOfWork<>));
            //builder
            //   .RegisterGeneric(typeof(UnitOfWork<>))
            //   .As(typeof(IUnitOfWork<>))
            //    .InstancePerRequest();


            typeof(IBaseService<>).Assembly.GetTypes()
               .Each(x => {
                   if (x.IsOrHasGenericInterfaceTypeOf(typeof(IBaseService<>)))
                       container.RegisterAutoWiredType(x);
               });
            //builder.RegisterAssemblyTypes(typeof(IServiceBase).Assembly)
            //   .Where(t => t.Name.EndsWith("Service"))
            //   .AsImplementedInterfaces().InstancePerRequest();

            //IContainerAdapter adapter = new AutofacIocAdapter(builder.Build());
            //container.Adapter = adapter;

            AutoMapperConfiguration.Config();
             */

            /**
             * 
             **/

            this.Plugins.Add(new CorsFeature());

            var builder = new ContainerBuilder();


            builder.Register(c =>
            {
                var contextOption = new DbContextOptionsBuilder<StudentContext>()
               .UseSqlServer(AppSettings.GetString("ConnectionString"), b => b.MigrationsAssembly("ServiceStack.API"))
               .Options;
                return new StudentContext(contextOption);
            }).InstancePerRequest();
            builder
                .RegisterGeneric(typeof(Repository<>))
                .As(typeof(IRepository<>))
                .InstancePerDependency();
            builder.RegisterType<StudentRepository>().As<IStudentRepository>();
            builder.RegisterType<DepartmentRepository>().As<IDepartmentRepository>();
            builder.RegisterType<ClassRepository>().As<IClassRepository>();


            builder
               .RegisterGeneric(typeof(UnitOfWork<>))
               .As(typeof(IUnitOfWork<>))
               .InstancePerDependency();
            builder.RegisterType<StudentService>().As<IStudentService>();
            builder.RegisterType<DepartmentService>().As<IDepartmentService>();
            builder.RegisterType<ClassService>().As<IClassService>();


            IContainerAdapter adapter = new AutofacIocAdapter(builder.Build(), container);
            container.Adapter = adapter;

            AutoMapperConfiguration.Config();

            // handle Exceptions occuring in Services.
            this.ServiceExceptionHandlers.Add((httpReq, request, exception) =>
            {
                var response = new BaseResponse
                {
                    Success = false,
                    StatusCode = 0,
                    Message = exception.Message,
                    Results = exception.GetResponseBody()
                };

                return DtoUtils.CreateErrorResponse(request, exception);

                //return new BaseResponse
                //{
                //    Success = false,
                //    StatusCode = 0,
                //    Message = exception.Message,
                //    Results = exception.GetResponseBody()
                //};
            });

            //this.UncaughtExceptionHandlers.Add((req, res, operationName, ex) => {
            //    res.Write($"Error: {ex.GetType().Name}: {ex.Message}");
            //    res.EndRequest(skipHeaders: true);
            //});
        }
    }
}