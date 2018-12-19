using Autofac;
using ServiceStack.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ServiceStack.API
{
    public class AutofacIocAdapter : IContainerAdapter
    {
        private Autofac.IContainer container;

        public AutofacIocAdapter(Autofac.IContainer container)
        {
            this.container = container;
        }

        public T Resolve<T>()
        {
            return container.Resolve<T>();
        }

        public T TryResolve<T>()
        {
            T result;

            if (container.TryResolve<T>(out result))
            {
                return result;
            }

            return default(T);
        }
    }
}