using Core.Entities;
using Core.Repositories;
using Core.Sevices;

namespace Service
{
  public class RoleService:IRoleService
  {
    private readonly IRoleRepository _roleRepository;

    public RoleService(IRoleRepository roleRepository)
    {
      _roleRepository = roleRepository;
    }

    public List<Role> GetRoles()
    {
      return _roleRepository.GetRoles();
    }

    public Role GetRole(int id)
    {
      return _roleRepository.GetRole(id);
    }

    public async Task<Role> AddRoleAsync(Role role)
    {
      return await _roleRepository.AddRoleAsync(role);
    }
  }
}
