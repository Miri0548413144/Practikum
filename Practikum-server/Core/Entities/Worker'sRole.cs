using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
  public class WorkerRole
  {
    public int Id { get; set; }
    public int RoleId { get; set; }
    public int WorkerId { get; set; }
    public bool IsManagement { get; set; }
    public DateTime EnteringDate { get; set; }
    //public Worker Worker { get; set; }
    public Role Role { get; set; }

  }
}
