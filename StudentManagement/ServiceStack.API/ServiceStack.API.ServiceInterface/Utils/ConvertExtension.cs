using Entity;
using ServiceStack.API.ServiceModel.Teacher;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;

namespace ServiceStack.API.ServiceInterface
{
    public static class ConvertExtension
    {
        public static void ToEntity(this object source, IEntity entity)
        {
            var properties = source.GetType().GetProperties();
            foreach (var property in properties)
            {
                var value = property.GetValue(source);
                if (value != null)
                {
                    PropertyInfo destProperty = entity.GetType().GetProperty(property.Name);
                    if (destProperty?.PropertyType == typeof(Nullable<DateTime>))
                        value = DateTime.Parse(value.ToString());
                    destProperty?.SetValue(entity, value);
                }
            }
        }
    }
}