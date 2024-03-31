using Core.Entities;

namespace API.Models
{
  public class RoleToPost
  {
    public Names Name { get; set; }
    public bool IsManagement { get; set; }
    public DateTime EnteringDate { get; set; }
    public int WorkerId { get; set; }
  }
}
