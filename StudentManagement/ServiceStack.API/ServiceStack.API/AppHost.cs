using DAL.Database;
using DAL.Repository;
using DAL.UnitOfWork;
using Entity;
using Funq;
using Service.StudentService;
using ServiceStack;
using ServiceStack.API.ServiceInterface;
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
            : base("ServiceStack.API", typeof(StudentService).Assembly) { }

        /// <summary>
        /// Application specific configuration
        /// This method should initialize any IoC resources utilized by your web service classes.
        /// </summary>
        public override void Configure(Container container)
        {
            //Config examples
            //this.Plugins.Add(new PostmanFeature());
            //this.Plugins.Add(new CorsFeature());
            container.Register<IDbConnectionFactory>(c => new OrmLiteConnectionFactory(
                AppSettings.GetString("ConnectionString"), SqlServerDialect.Provider));


            container.RegisterAutoWired<IUnitOfWork<IEntity>>().ReusedWithin(ReuseScope.Container);
            container.RegisterAutoWired<IRepository<IEntity>>().ReusedWithin(ReuseScope.Container);
            container.RegisterAutoWired<IServiceBase>().ReusedWithin(ReuseScope.Container);

            //GetType().Assembly.GetTypes().Where(x => x.IsOrHasGenericInterfaceTypeOf(typeof(IUnitOfWork<IEntity>)))
            //    .Each(x => container.RegisterAutoWiredType(x));
        }
    }
}