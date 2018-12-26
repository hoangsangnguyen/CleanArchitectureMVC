using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class Teacher : IEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public int? SubjectId { get; set; }
        public virtual Subject Subject { get; set; }

        public int DepartmentId { get; set; }
        public virtual Department Department { get; set; }

        public bool IsManager { get; set; }
    }
}
