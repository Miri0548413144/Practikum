using API.Models;
using AutoMapper;
using Core;
using Core.DTOs;
using Core.Entities;

namespace API
{
  public class APIMapping:Profile
  {
    public APIMapping()
    {
      CreateMap<Worker, WorkerToPost>().ReverseMap();
      CreateMap<Role, RoleToPost>().ReverseMap();
      CreateMap<WorkerRole, WorkerRoleToPost>().ReverseMap();
    }
  }
}
