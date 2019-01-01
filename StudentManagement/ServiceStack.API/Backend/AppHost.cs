﻿using Autofac;
using Backend.ServiceInterface;
using Backend.ServiceInterface.Utils;
using DAL.Database;
using DAL.Repository;
using DAL.UnitOfWork;
using Entity;
using Funq;
using Microsoft.EntityFrameworkCore;
using Service.BaseService;
using ServiceStack;
using ServiceStack.Auth;
using ServiceStack.Caching;
using ServiceStack.Configuration;
using ServiceStack.Data;
using ServiceStack.OrmLite;
using System.Data;

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
                new CredentialsAuthProvider(AppSettings),
                //new CustomCredentialsAuthProvider()
            }));

            this.Plugins.Add(new RegistrationFeature());

            container.Register<ICacheClient>(new MemoryCacheClient());

            //container.Register<IDbConnectionFactory>(c =>
            //    new OrmLiteConnectionFactory(AppSettings.GetString("ConnectionString"), SqlServer2017Dialect.Provider));

            //container.Register<IAuthRepository>(c =>
            //    new OrmLiteAuthRepository(dbFactory: c.Resolve<IDbConnectionFactory>()));

            //container.Resolve<IAuthRepository>().InitSchema();

            var userRep = new InMemoryAuthRepository();
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