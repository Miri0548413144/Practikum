using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs
{
  public class WorkerRoleDTO
  {   
    public bool IsManagement { get; set; }
    public DateTime EnteringDate { get; set; }
    public int RoleId { get; set; }
  }
}
