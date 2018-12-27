using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceStack.API.ServiceModel.Score
{
    public class ScoreDto
    {
        public int StudentId { get; set; }
        public string StudentName { get; set; }

        public int SubjectId { get; set; }
        public string SubjectName { get; set; }

        public float Mark { get; set; }
    }

    [Route("/scores", "GET")]
    public class GetScores : IReturn<BaseResponse> { }

    [Route("/scores/{SubjectId}/{StudentId}", "GET")]
    [Route("/scores", "DELETE")]
    public class ScoreById : IReturn<BaseResponse>
    {
        public int StudentId { get; set; }
        public int SubjectId { get; set; }
    }

    [Route("/scores", "POST")]
    public class CreateScore : IReturn<BaseResponse>
    {
        public int StudentId { get; set; }
        public int SubjectId { get; set; }
        public float Mark { get; set; }
    }

    [Route("/scores", "PUT")]
    public class UpdateScore : IReturn<BaseResponse>
    {
        public int StudentId { get; set; }
        public int SubjectId { get; set; }
        public float? Mark { get; set; }
    }

}
