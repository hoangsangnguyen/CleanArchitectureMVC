﻿using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.AutoMapper
{
    public class AutoMapperConfiguration
    {
        public static void Config()
        {
            Mapper.Initialize(cfg => {
                cfg.AddProfile(new DtoEntityCommonMapper());
            });
        }
    }
}
