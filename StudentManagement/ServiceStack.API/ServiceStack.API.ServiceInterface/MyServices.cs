using ServiceStack;
using ServiceStack.API.ServiceModel;

namespace ServiceStack.API.ServiceInterface
{
    public class StudentServices : Service
    {
        public object Any(Hello request)
        {
            return new HelloResponse { Result = $"Hello, {request.Name}!" };
        }
    }
}