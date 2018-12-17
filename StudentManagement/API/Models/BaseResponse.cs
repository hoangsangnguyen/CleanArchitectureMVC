using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace API.Models
{
    public class BaseResponse
    {
        public bool Success { get; set; }
        public HttpStatusCode StatusCode { get; set; }
        public object Results { get; set; }

    }
}
