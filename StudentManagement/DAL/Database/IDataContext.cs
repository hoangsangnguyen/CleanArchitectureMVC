using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Database
{
    public interface IDataContext : IDisposable
    {
        Task<int> SaveChangeAsync();
        ChangeTracker changeTracker();
    }
}
