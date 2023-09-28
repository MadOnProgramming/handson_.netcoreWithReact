using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;

namespace Application.Core
{

    /// <summary>
    ///Mapping profiles for automapper functionality
    ///which will be registered to IOC container in program.cs
    ///and injected to usecase cs files under application project
    /// </summary>
                
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity,Activity>();
        }
    }
}