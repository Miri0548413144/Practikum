using Core.Entities;

namespace Core.Repositories
{
  public interface IRoleRepository
  {
    List<Role> GetRoles();
    Role GetRole(int id);
    Task<Role> AddRoleAsync(Role Role);
  }
}
