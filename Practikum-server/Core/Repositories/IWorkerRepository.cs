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
    async Task<Worker> AddWorkerAsync(Worker worker);
    async Task<Worker> UpdateAsync(int id , Worker worker);
    async Task<Worker> RemoveWorkerAsync(int id);
  }
}
