using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;

namespace Backend.ServiceInterface
{
    public static class ConvertExtension
    {
        public static void ToEntity(this object source, IEntity entity, string[] exceptionProperty = null)
        {
            var properties = source.GetType().GetProperties();
            foreach (var property in properties)
            {
                if (exceptionProperty != null && exceptionProperty.Contains(property.Name))
                    continue;
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