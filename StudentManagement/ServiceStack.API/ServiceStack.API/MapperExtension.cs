using Entity;
using ServiceStack.API.ServiceModel.Teacher;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ServiceStack.API
{
    public static class MapperExtension
    {
        public static void MapDtoToEntity(this UpdateTeacher source, IEntity entity)
        {
            source.GetType().GetProperties().Each(x => Console.WriteLine(x));
            
        }
    }
}