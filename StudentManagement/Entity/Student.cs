using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class Student : IEntity
    {
        public Student()
        {
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public int ClassId { get; set; }
        public virtual Class Class { get; set; }

        public virtual ICollection<Score> Scores { get; set; }

    }
}
