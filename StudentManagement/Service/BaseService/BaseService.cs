using DAL.UnitOfWork;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Service.BaseService
{
    public abstract class BaseService<T> : IBaseService<T> where T : IEntity
    {
        protected readonly IUnitOfWork<T> _unitOfWork;

        public BaseService(IUnitOfWork<T> unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public virtual async Task<T> Create(T entity)
        {
            _unitOfWork.Repository.Create(entity);
            await _unitOfWork.Save();
            return entity;
        }

        public virtual async Task<T> Delete(object id)
        {
            var entity = await _unitOfWork.Repository.GetById(id);
            _unitOfWork.Repository.Delete(entity);
            await _unitOfWork.Save();
            return entity;
        }

        public async virtual Task<T> Delete(T entity)
        {
            _unitOfWork.Repository.Delete(entity);
            await _unitOfWork.Save();
            return entity;
        }

        public virtual async Task<IEnumerable<T>> GetAll()
        {
            var entities = await Task.FromResult(_unitOfWork.Repository.GetAll());
            return entities.AsEnumerable();
        }

        public virtual async Task<T> GetById(object id)
        {
            var entity = await _unitOfWork.Repository.GetById(id);
            return entity;
        }

        public virtual async Task<T> Update(T entity)
        {
            _unitOfWork.Repository.Update(entity);
            await _unitOfWork.Save();
            return entity;
        }
    }
}
