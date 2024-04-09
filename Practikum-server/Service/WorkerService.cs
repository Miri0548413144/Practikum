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
      bool valid = true;
      for (int i = 0; i < worker.Roles.Count(); i++)
      {
        if (worker.Roles[i].EnteringDate < worker.StartDate)
          valid = false;
      }
      if (!valid)
        throw new InvalidDataException("entering day is not valid");

      return await _workerRepository.AddWorkerAsync(worker);
    }

    public async Task<Worker> UpdateAsync(int id, Worker worker)
    {
      bool valid = true;
      for (int i = 0; i < worker.Roles.Count(); i++)
      {
        if (worker.Roles[i].EnteringDate < worker.StartDate)
          valid = false;
      }
      if (!valid)
        throw new InvalidDataException("entering day is not valid");

      return await _workerRepository.UpdateAsync(id, worker);
    }

    public async Task<Worker> RemoveWorkerAsync(int id)
    {
      return await _workerRepository.RemoveWorkerAsync(id);
    }
  }
}
