using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Database;
using DAL.Repository;
using Entity;

namespace DAL.UnitOfWork
{
    public class UnitOfWork<T> : IUnitOfWork<T>, IDisposable where T : IEntity
    {
        private StudentContext context;
        
        public IRepository<T> Repository { get; set; }
        public UnitOfWork(StudentContext context, IRepository<T> repostory)
        {
            this.context = context;
            Repository = repostory;
        }        

        public virtual void Dispose()
        {
            context.Dispose();
        }

        private bool disposed = false;
        public void Dispose(bool disposing)
        {
            if (this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public async Task Save()
        {
            try
            {
                await context.SaveChangeAsync();
            }
            catch
            {
                context.Database.BeginTransaction().Rollback();
            }
        }
    }
}
