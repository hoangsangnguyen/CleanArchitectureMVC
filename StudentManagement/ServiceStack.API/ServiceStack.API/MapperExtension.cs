using Backend.ServiceModel.Teacher;
using Entity;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Backend
{
    public static class MapperExtension
    {
        public static void MapDtoToEntity(this UpdateTeacher source, IEntity entity)
        {
            source.GetType().GetProperties().Each(x => Console.WriteLine(x));
            
        }
    }
}