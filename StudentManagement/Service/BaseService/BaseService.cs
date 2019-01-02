using DAL.UnitOfWork;
using Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
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

        public virtual async Task<T> Delete(Expression<Func<T, bool>> keySelector)
        {
            var entity = await _unitOfWork.Repository.GetById(keySelector: keySelector);
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

        public virtual async Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = "")
        {
            var entities = await _unitOfWork.Repository.GetAll(filter, orderBy, includeProperties).ToListAsync();
            return entities.AsEnumerable();
        }

        public virtual async Task<IEnumerable<object>> GetModelsWithKeys(params string[] keys)
        {
            foreach(string key in keys)
            {
                var propertyInfo = typeof(T).GetProperty(key);
                if (propertyInfo == null)
                    throw new EntryPointNotFoundException();
            }

            var entities = await _unitOfWork.Repository.GetAll().Select(
                x => new {
                }).ToListAsync();

            return entities;
        }

        public virtual async Task<T> GetById(Expression<Func<T, bool>> keySelector, string includeProperties = "")
        {
            var entity = await _unitOfWork.Repository.GetById(keySelector, includeProperties);
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
