using DAL.Database;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository.Classes
{
    public class ClassRepository : Repository<Class>, IClassRepository
    {
        public ClassRepository(StudentContext context) : base(context)
        {
        }
    }
}
