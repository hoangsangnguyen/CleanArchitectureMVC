using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.BaseService
{
    public interface IBaseService<T> where T : IEntity
    {
        Task<IEnumerable<T>> GetAll();
        Task<T> GetById(object id);
        Task<int> Create(T entity);
        Task<int> Update(T entity);
        Task<int> Delete(object id);
        Task<int> Delete(T entity);
    }
}
