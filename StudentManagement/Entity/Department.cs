using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class Department : IEntity
    {
        public string Name { get; set; }
        public virtual ICollection<Class> Classes { get; set; }
        public virtual ICollection<Teacher> Teachers { get; set; }

    }
}
