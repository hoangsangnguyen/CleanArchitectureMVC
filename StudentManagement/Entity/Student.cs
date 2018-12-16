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
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public double Score { get; set; }

    }
}
