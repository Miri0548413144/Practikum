using Core.Entities;
using Core.Repositories;
using Core.Sevices;

namespace Service
{
  public class WorkerService : IWorkerService
  {
    private readonly IWorkerRepository _workerRepository;

    public WorkerService(IWorkerRepository workerRepository)
    {
      _workerRepository = workerRepository;
    }

    public List<Worker> GetWorkers()
    {
      return _workerRepository.GetWorkers().Where(e=>e.Active).ToList();
    }

    public Worker GetWorker(int id)
    {
      return _workerRepository.GetWorker(id);
    }

    public async Task<Worker> AddWorkerAsync(Worker worker)
    {
      return await _workerRepository.AddWorkerAsync(worker);
    }

    public async Task<Worker> UpdateAsync(int id, Worker worker)
    {
      return await _workerRepository.UpdateAsync(id, worker);
    }

    public async Task<Worker> RemoveWorkerAsync(int id)
    {
      return await _workerRepository.RemoveWorkerAsync(id);
    }
  }
}
