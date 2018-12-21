﻿using API.AutoMapper;
using Autofac;
using DAL.Database;
using DAL.Repository;
using DAL.UnitOfWork;
using Entity;
using Funq;
using Microsoft.EntityFrameworkCore;
using Service.BaseService;
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
        }
    }
}