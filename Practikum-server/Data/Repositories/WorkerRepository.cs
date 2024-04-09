using Core.Entities;
using Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories
{
  public class WorkerRepository: IWorkerRepository
  {
    private readonly DataContext _context;
    public WorkerRepository(DataContext context) {
      _context = context;
    }
    public List<Worker> GetWorkers()
    {
      return _context.Workers.Include(roleWorker => roleWorker.Roles).ToList();
    }

    public Worker GetWorker(int id)
    {
      return _context.Workers.FirstOrDefault(w => w.Id == id);
    }

    public async Task<Worker> AddWorkerAsync(Worker worker)
    {
      
      _context.Workers.Add(worker);
      await _context.SaveChangesAsync(); 
      return worker;
     
    }

    public async Task<Worker> UpdateAsync(int id, Worker worker)
    {
     
      Worker existingWorker = _context.Workers.FirstOrDefault(w => w.Id == id);
      if (existingWorker != null)
      {
        existingWorker.FirstName = worker.FirstName; 
        existingWorker.LastName = worker.LastName; 
        existingWorker.Tz = worker.Tz; 
        existingWorker.StartDate = worker.StartDate; 
        existingWorker.BirthDate = worker.StartDate; 
        existingWorker.MyGender = worker.MyGender; 
        existingWorker.Active = worker.Active; 
        existingWorker.Roles = worker.Roles; 
        await _context.SaveChangesAsync();
      }
      return existingWorker;
    }

    public async  Task<Worker> RemoveWorkerAsync(int id)
    {
      Worker workerToRemove = _context.Workers.FirstOrDefault(w => w.Id == id);
      if (workerToRemove != null)
      {
        workerToRemove.Active = false;
        await _context.SaveChangesAsync(); 
      }
      return workerToRemove;
    }
  }
}
