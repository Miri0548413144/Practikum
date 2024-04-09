using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Entities
{
  public enum Gender { Male=1, Female=2 ,other=3} 

  public class Worker
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Tz { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime BirthDate { get; set; }
        public Gender MyGender { get; set; }
        public bool Active {  get; set; }
        public string ImageURL {  get; set; }
        public List<WorkerRole> Roles { get; set; }
  //  public Worker(string firstName, string lastName, string tz, DateTime startDate, DateTime birthDate, Gender myGender, bool active,List<Role>roles)
  //  {
  //    FirstName = firstName;
  //    LastName = lastName;
  //    Tz = tz;
  //    StartDate = startDate;
  //    BirthDate = birthDate;
  //    MyGender = myGender;
  //    Active = active;

  //    // Fetch roles from the database
  //    Roles = roles;
  //  }
  //  public Worker(string firstName, string lastName, string tz, DateTime startDate, DateTime birthDate, Gender myGender, bool active)
  //  {
  //    FirstName = firstName;
  //    LastName = lastName;
  //    Tz = tz;
  //    StartDate = startDate;
  //    BirthDate = birthDate;
  //    MyGender = myGender;
  //    Active = active;

  //    // Fetch roles from the database
    
  //  }


  }
}
