using Entity;
using ServiceStack.API.ServiceModel.Teacher;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ServiceStack.API.ServiceInterface
{
    public static class MapperExtension
    {
        public static void MapDtoToEntity(this object source, IEntity entity)
        {
            var properties = source.GetType().GetProperties();
            foreach(var property in properties)
            {
                var value = property.GetValue(source);
                if (value != null)
                {
                    entity.GetType().GetProperty(property.Name)?.SetValue(entity, value);
                }
            }
        }
    }
}