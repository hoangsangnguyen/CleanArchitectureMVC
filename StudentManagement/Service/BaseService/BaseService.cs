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

        public virtual async Task<int> Create(T entity)
        {
            try
            {
                _unitOfWork.Repository.Create(entity);
                await _unitOfWork.Save();
                return entity.Id;
            }
            catch (Exception e)
            {
                throw e;
            }
           
        }

        public virtual async Task<int> Delete(object id)
        {
            try
            {
                var entity = await _unitOfWork.Repository.GetById(id);
                if (entity == null) throw new Exception("Not found entity object with id " + id);
                _unitOfWork.Repository.Delete(entity);
                await _unitOfWork.Save();
                return (int)id;
            }
            catch (Exception e)
            {
                throw e;
            }

            
        }

        public Task<int> Delete(T entity)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            try
            {
                var entities = await Task.FromResult(_unitOfWork.Repository.GetAll());
                return entities.AsEnumerable();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<T> GetById(object id)
        {
            try
            {
                var entity = await _unitOfWork.Repository.GetById(id);
                return entity;
            } catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<int> Update(T entity)
        {
            try
            {
                _unitOfWork.Repository.Update(entity);
                await _unitOfWork.Save();
                return entity.Id;
            } catch (Exception e)
            {
                throw e;
            }
            
        }
    }
}
