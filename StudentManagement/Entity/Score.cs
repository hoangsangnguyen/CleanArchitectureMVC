using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class Score : IEntity
    {
        [Key, Column(Order = 0)]
        public int StudentId { get; set; }
        public virtual Student Student { get; set; }

        [Key, Column(Order = 0)]
        public int SubjectId { get; set; }
        public virtual Subject Subject { get; set; }

        public double Mark { get; set; }
    }
}
