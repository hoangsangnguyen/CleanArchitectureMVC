using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class Class : IEntity
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public int DepartmentId { get; set; }
        public virtual Department Department { get; set; }

        public virtual ICollection<Student> Students { get; set; }
    }
}
