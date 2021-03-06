﻿using Entity;
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
        IQueryable<T> GetAll(Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = "");        
        Task<T> GetById(Expression<Func<T, bool>> keySelector, string includeProperties = "");
        void Create(T entity);
        void Update(T entity);

        void Delete(object id);

        void Delete(T entity);
    }
}
