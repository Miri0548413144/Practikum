using Core.Entities;
using Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories
{
  public class RoleRepository:IRoleRepository
  {
    private readonly DataContext _context;
    public RoleRepository(DataContext context)
    {
      _context = context;
    }
    public List<Role> GetRoles()
    {
      return _context.Roles.ToList();
    }

    public Role GetRole(int id)
    {
      return _context.Roles.FirstOrDefault(w => w.Id == id);
    }

    public async Task<Role> AddRoleAsync(Role role)
    {
      _context.Roles.Add(role);
      await _context.SaveChangesAsync();
      return role;
    }

  }
}
