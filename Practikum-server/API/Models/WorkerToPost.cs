using Core.Entities;

namespace API.Models
{
  public class WorkerToPost
  {
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Tz { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime BirthDate { get; set; }
    public Gender MyGender { get; set; }
    public bool Active { get; set; }
    public string ImageURL { get; set; }
    public List<WorkerRoleToPost> Roles { get; set; }
  }
}
