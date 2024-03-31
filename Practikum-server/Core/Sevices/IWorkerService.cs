using Core.Entities;
namespace Core.Sevices
{
  public interface IWorkerService
  {
    List<Worker> GetWorkers();
    Worker GetWorker(int id);
    Task<Worker> AddWorkerAsync(Worker worker);
    Task<Worker> UpdateAsync(int id, Worker worker);
    Task<Worker> RemoveWorkerAsync(int id);
  }
}
