using API.Models;
using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Sevices;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class WorkersController : ControllerBase
  {
    private readonly IWorkerService _workerService;
    private readonly IMapper _mapper;

    public WorkersController(IWorkerService workerService,IMapper mapper)
    {
      _workerService = workerService;
      _mapper = mapper;
    }

    // GET: api/<WorkersController>
    [HttpGet]
    public ActionResult<Worker> Get()
    {
      var list = _workerService.GetWorkers();
      var listDto = list.Select(u => _mapper.Map<WorkerDTO>(u));
      return Ok(listDto);
    }

    // GET api/<WorkersController>/5
    [HttpGet("{id}")]
    public ActionResult<Worker> Get(int id)
    {
      var worker = _workerService.GetWorker(id);
      if (worker == null)
      {
        return NotFound();
      }
      var workerDto = _mapper.Map<WorkerDTO>(worker);
      return Ok(workerDto);
    }

    // POST api/<WorkersController>
    [HttpPost]
    public async Task<ActionResult<Worker>> Post([FromBody] WorkerToPost worker)
    {
      var workerToAdd =  _mapper.Map<Worker>(worker);
      var addedWorker = await _workerService.AddWorkerAsync(workerToAdd);
      var workerDto = _mapper.Map<WorkerDTO>(addedWorker);
      return Ok(workerDto);
    }

    // PUT api/<WorkersController>/5
    [HttpPut("{id}")]
    public async Task<ActionResult<Worker>> Put(int id, [FromBody] Worker worker)
    {
      var existWorker = _workerService.GetWorker(id);
      if (existWorker is null)
      {
        return NotFound();
      }
      _mapper.Map(worker, existWorker);
      await _workerService.UpdateAsync(id, worker);

      return Ok(_mapper.Map<WorkerDTO>(existWorker));
    }

    // DELETE api/<WorkersController>/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<Worker>> Delete(int id)
    {
      var removedWorker =await _workerService.RemoveWorkerAsync(id);
      if (removedWorker == null)
      {
        return NotFound();
      }
      return removedWorker;
    }
  }
}
