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
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private StudentContext context;
        private Dictionary<Type, object> _repositories;

        public UnitOfWork(StudentContext context, IStudentRepository studentRepostory)
        {
            this.context = context;
            _repositories = new Dictionary<Type, object>();
            _repositories.Add(typeof(Student), studentRepostory);
        }

        public IRepository<T> Repository<T>() where T : IEntity { return (IRepository<T>)_repositories[typeof(T)]; }

        #region Material
        //public IRepository<T> RepositoryAsync<T>() where T : IEntity
        //{
        //    if (_repositories == null)
        //    {
        //        _repositories = new Dictionary<string, object>();
        //    }

        //    var type = typeof(T).Name;

        //    if (_repositories.ContainsKey(type))
        //    {
        //        return (IRepository<T>)_repositories[type];
        //    }

        //    var repositoryType = typeof(Repository<>);
        //    try
        //    {
        //        _repositories.Add(type, Activator.CreateInstance(repositoryType.MakeGenericType(typeof(T)), context, this));

        //    } catch (Exception e)
        //    {
        //        Console.WriteLine("ERROR INIT Repo : " + e.Message);
        //    }

        //    return (IRepository<T>)_repositories[type];
        //}

        //public IStudentRepository StudentRepository { get {
        //        if (this.studentRepository == null)
        //        {
        //            this.studentRepository = new StudentRepository(context);
        //        }
        //        return this.studentRepository;
        //    } }
        #endregion
        public virtual void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
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

        //public void RejectChanges()
        //{
        //    foreach (var entry in context.changeTracker().Entries()
        //      .Where(e => e.State.CompareTo(EntityState.Unchanged) == 0)
        //    {
        //        switch (entry.State)
        //        {
        //            case EntityState.Added:
        //                entry.State = EntityState.Detached;
        //                break;
        //            case EntityState.Modified:
        //            case EntityState.Deleted:
        //                entry.Reload();
        //                break;
        //        }
        //    }
        //}

        public async Task Save()
        {
            await context.SaveChangeAsync();
        }
    }
}
