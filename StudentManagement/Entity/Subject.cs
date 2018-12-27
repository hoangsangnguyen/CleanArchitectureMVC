using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class Subject : IEntity
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public virtual ICollection<Score> Scores { get; set; }

        public virtual ICollection<Teacher> Teachers { get; set; }

    }
}
