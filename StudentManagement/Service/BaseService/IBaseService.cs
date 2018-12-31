using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Service.BaseService
{
    public interface IBaseService<T> where T : IEntity
    {
        Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = "");
        Task<IEnumerable<object>> GetModelsWithKeys(params string[] keys);
        Task<T> GetById(object id);
        Task<T> Create(T entity);
        Task<T> Update(T entity);
        Task<T> Delete(object id);
        Task<T> Delete(T entity);
    }
}
