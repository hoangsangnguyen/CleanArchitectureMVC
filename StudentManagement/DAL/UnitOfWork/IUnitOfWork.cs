using DAL.Repository;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.UnitOfWork
{
    public interface IUnitOfWork<T> where T : Entity.IEntity
    {
        IRepository<T> Repository { get; set; }
        Task Save();

        /// <summary>
        /// Discards all changes that has not been commited
        /// </summary>
        //void RejectChanges();
        void Dispose(bool disposing);

    }
}
