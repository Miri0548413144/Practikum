using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Sevices
{
  public interface IRoleService
  {
    List<Role> GetRoles();
    Role GetRole(int id);
    Task<Role> AddRoleAsync(Role Role);
  }
}
