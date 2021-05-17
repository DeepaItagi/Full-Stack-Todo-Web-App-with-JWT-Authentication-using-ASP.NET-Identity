using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using todoapp_server.DTOs;
using todoapp_server.Entities;

namespace todoapp_server.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Todo, TodoDto>();

            CreateMap<TodoDto, Todo>();

            CreateMap<AppUser, UserDto>();

            CreateMap<RegisterDto, AppUser>();
        }
    }
}
