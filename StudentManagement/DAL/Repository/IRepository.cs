using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public interface IRepository<T> where T : IEntity
    {
        IQueryable<T> GetAll();
        Task<T> GetById(object id);
        void Create(T entity);
        void Update(T entity);

        void Delete(object id);

        void Delete(T entity);
    }
}
