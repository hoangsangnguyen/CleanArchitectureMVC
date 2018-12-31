using Autofac;
using Autofac.Integration.Mvc;
using Funq;
using ServiceStack.Configuration;
using System;
using System.Web;

namespace Backend
{
    /// <summary>
    /// Adapater between ServiceStack and Autofac
    /// (Replace the default Funq Ioc Container)
    /// </summary>
    public class AutofacIocAdapter : IContainerAdapter
    {
        private readonly Autofac.IContainer _container;
        private readonly Container _funqContainer;

        public AutofacIocAdapter(Autofac.IContainer container, Container funqContainer)
        {
            _container = container;
            // Register a RequestLifetimeScopeProvider (from Autofac.Integration.Mvc) with Funq
            var lifetimeScopeProvider = new RequestLifetimeScopeProvider(_container);
            funqContainer.Register<ILifetimeScopeProvider>(x => lifetimeScopeProvider);
            //Store the autofac application (root) container, and the funq container for later use            
            _funqContainer = funqContainer;
        }

        public Action<ContainerBuilder> ConfigAction { get; set; }

        private ILifetimeScope ActiveScope
        {
            get
            {
                // If there is an active HttpContext, retrieve the lifetime scope by resolving
                // the ILifetimeScopeProvider from Funq.  Otherwise, use the application (root) container.

                return HttpContext.Current == null
                            ? _container
                            : _funqContainer.Resolve<ILifetimeScopeProvider>().GetLifetimeScope(ConfigAction);
            }
        }
        public T Resolve<T>()
        {
            return ActiveScope.Resolve<T>();
        }

        public T TryResolve<T>()
        {
            T result;

            if (ActiveScope.TryResolve<T>(out result))
            {
                return result;
            }

            return default(T);
        }

    }
}