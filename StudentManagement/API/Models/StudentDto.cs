using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class StudentDto : BaseDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public double Score { get; set; }
        
    }
}
