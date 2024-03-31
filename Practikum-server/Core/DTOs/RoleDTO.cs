using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs
{
  public class RoleDTO
  {
    public Names Name { get; set; }
    public bool IsManagement { get; set; }
    public DateTime EnteringDate { get; set; }
    public int WorkerId { get; set; }
  }
}
