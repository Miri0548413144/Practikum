using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs
{
  public class WorkerDTO
  {
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Tz { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime BirthDate { get; set; }
    public Gender MyGender { get; set; }
    public bool Active { get; set; }
    public string ImageURL { get; set; }
    public List<WorkerRoleDTO> Roles { get; set; } 
  }
}
