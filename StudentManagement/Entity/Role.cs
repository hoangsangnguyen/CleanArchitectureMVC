using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    [Table("z_Role")]
    public class Role : IEntity
    {
        [Key]
        [MaxLength(50)]
        public string SystemName { get; set; }

        [Required]
        public string Display { get; set; }

    }
}
