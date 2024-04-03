
using Core.Entities;

namespace API.Models
{
  public class WorkerRoleToPost
  {
    public bool IsManagement { get; set; }
    public DateTime EnteringDate { get; set; }
    public int RoleId { get; set; }
  }
}
