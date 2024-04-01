using API.Models;
using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Sevices;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class RoleController : ControllerBase
  {
    private readonly IRoleService _roleService;
    private readonly IMapper _mapper;

    public RoleController(IRoleService roleService, IMapper mapper)
    {
      _roleService = roleService;
      _mapper = mapper;
    }
    // GET: api/<RoleController>
    [HttpGet]
    public ActionResult<Role> Get()
    {
      var list = _roleService.GetRoles();
      var listDto = list.Select(u => _mapper.Map<RoleDTO>(u));
      return Ok(listDto);
    }

    // GET api/<RoleController>/5
    [HttpGet("{id}")]
    public ActionResult<Role> Get(int id)
    {
      var role = _roleService.GetRole(id);
      if (role == null)
      {
        return NotFound();
      }
      var roleDto = _mapper.Map<RoleDTO>(role);
      return Ok(roleDto);
    }

    // POST api/<RoleController>
    [HttpPost]
    public async Task<ActionResult<Role>> Post([FromBody] RoleToPost role)
    {
      var roleToAdd = _mapper.Map<Role>(role);
      var addedRole = await _roleService.AddRoleAsync(roleToAdd);
      var roleDto = _mapper.Map<RoleDTO>(addedRole);
      return Ok(roleDto);
    }

  }
}
