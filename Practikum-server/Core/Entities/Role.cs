using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
  public enum Names {  manager, teacher, supervisor, secretary  }
 public class Role
  {
   public int Id { get; set; }
   public Names Name { get; set; }
   public bool IsManagement { get; set; }
   public DateTime EnteringDate { get; set; }
   public int WorkerId { get; set; }
   public Worker Worker { get; set; }
  }
}
