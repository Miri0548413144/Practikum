using AutoMapper;
using Core.DTOs;
using Core.Entities;

namespace Core
{
  public class MappingProfile:Profile
  {
    public MappingProfile()
    {
        CreateMap<Worker,WorkerDTO>().ReverseMap();
        CreateMap<Role,RoleDTO>().ReverseMap();
        CreateMap<WorkerRole,WorkerRoleDTO>().ReverseMap();
    }
  }
}
