using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.ServiceModel.Score
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
    [Route("/scores/{StudentId}/{SubjectId}/{Mark}", "GET")]
    public class GetScores : IReturn<BaseResponse> {
        public Nullable<int> StudentId { get; set; }
        public Nullable<int> SubjectId { get; set; }
        public Nullable<float> Mark { get; set; }

    }

    [Route("/scores/{StudentId}/{SubjectId}", "GET, DELETE")]
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
