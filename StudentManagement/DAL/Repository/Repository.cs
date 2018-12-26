using DAL.Database;
using Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public class Repository<T> : IRepository<T> where T : IEntity
    {
        internal StudentContext _context;
        internal DbSet<T> _dbSet;

        public Repository(StudentContext context)
        {
            this._context = context;
            this._dbSet = context.Set<T>();
        }

        public virtual IQueryable<T> GetAll()
        {
            return _dbSet;
        }

        public async Task<T> GetById(object id)
        {
            return await _dbSet.FindAsync(id);
        }

        public void Create(T entity)
        {
            _dbSet.Add(entity);
        }

        public void Delete(object id)
        {
            T entityToDelete = _dbSet.Find(id);
            Delete(entityToDelete);
        }

        public virtual void Delete(T entity)
        {
            if (_context.Entry(entity).State == EntityState.Unchanged)
            {
                _dbSet.Attach(entity);
            }
            _dbSet.Remove(entity);
        }

        public void Update(T entity)
        {
            Console.WriteLine("State : " + _context.Entry(entity).State.ToString());
            if (_context.Entry(entity).State == EntityState.Detached)
            {
                _dbSet.Attach(entity);
            }
            _context.Entry(entity).State = EntityState.Modified;
        }        
    }
}
