using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Database;
using DAL.Repository;
using Entity;
using Microsoft.EntityFrameworkCore;

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
                RollBack();
                throw;
            }
        }

        public void RollBack()
        {
            var changedEntries = context.ChangeTracker.Entries()
                .Where(x => x.State != EntityState.Unchanged).ToList();

            foreach (var entry in changedEntries)
            {
                switch (entry.State)
                {
                    case EntityState.Modified:
                        entry.CurrentValues.SetValues(entry.OriginalValues);
                        entry.State = EntityState.Unchanged;
                        break;
                    case EntityState.Added:
                        entry.State = EntityState.Detached;
                        break;
                    case EntityState.Deleted:
                        entry.State = EntityState.Unchanged;
                        break;
                }
            }
        }
    }
}
