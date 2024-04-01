using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories
{
  public interface IWorkerRepository
  {
    List<Worker> GetWorkers();
    Worker GetWorker(int id);
    Task<Worker> AddWorkerAsync(Worker worker);
    Task<Worker> UpdateAsync(int id, Worker worker);
    Task<Worker> RemoveWorkerAsync(int id);
  }
}
