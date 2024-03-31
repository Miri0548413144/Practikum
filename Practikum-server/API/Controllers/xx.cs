
//using API.Models;
//using AutoMapper;
//using Core.DTOs;
//using Core.Entities;
//using Core.Services;
//using Microsoft.AspNetCore.Mvc;
//using System.Collections.Generic;

//namespace API.Controllers
//  {
//    [Route("api/[controller]")]
//    [ApiController]
//    public class WorkersController : ControllerBase
//    {
//      private readonly IEmployeeService _employeeService;
//      private readonly IMapper _mapper;

//      public WorkersController(IEmployeeService employeeService, IMapper mapper)
//      {
//        _employeeService = employeeService;
//        _mapper = mapper;
//      }

//      // GET: api/<WorkersController>
//      [HttpGet]
//      public ActionResult Get()
//      {
//        // return _employeeService.GetAll();
//        var list = _employeeService.GetAll();
//        var listDto = list.Select(u => _mapper.Map<EmployeeDto>(u));
//        return Ok(listDto);
//      }

//      // GET api/<WorkersController>/5
//      [HttpGet("{id}")]
//      public ActionResult<Employee> Get(int id)
//      {
//        //var employee = _employeeService.EmployeeGetById(id);
//        //if (employee == null)
//        //{
//        //    return NotFound();
//        //}
//        //return employee;
//        var s = _employeeService.EmployeeGetById(id);
//        var employeeDto = _mapper.Map<EmployeeDto>(s);
//        return Ok(employeeDto);
//      }

//      // POST api/<WorkersController>
//      [HttpPost]
//      public ActionResult<Employee> Post([FromBody] EmployeePostModel employee)
//      {
//        //var addedEmployee = _employeeService.AddEmployee(employee);
//        ////return CreatedAtAction(nameof(Get), new { id = addedEmployee.Id }, addedEmployee);

//        //return addedEmployee;
//        var employeeToAdd = _mapper.Map<Employee>(employee);
//        var addedEmployee = _employeeService.AddEmployee(employeeToAdd);
//        var employeeDto = _mapper.Map<EmployeeDto>(addedEmployee);
//        return Ok(employeeDto);

//      }

//      // PUT api/<WorkersController>/5
//      [HttpPut("{id}")]
//      public ActionResult<Employee> Put(int id, [FromBody] Employee employee)
//      {
//        //var updatedEmployee = _employeeService.UpdateEmployee(id, employee);
//        //if (updatedEmployee == null)
//        //{
//        //    return NotFound();
//        //}
//        //return updatedEmployee;
//        var existEmployee = _employeeService.EmployeeGetById(id);
//        if (existEmployee is null)
//        {
//          return NotFound();
//        }
//        _mapper.Map(employee, existEmployee);
//        _employeeService.UpdateEmployee(id, existEmployee);

//        return Ok(_mapper.Map<EmployeeDto>(existEmployee));
//      }

//      // DELETE api/<WorkersController>/5
//      [HttpDelete("{id}")]
//      public ActionResult<Employee> Delete(int id)
//      {
//        var deletedEmployee = _employeeService.DeleteEmployee(id);
//        if (deletedEmployee == null)
//        {
//          return NotFound();
//        }
//        return deletedEmployee;
//      }
//    }
//  }
//}
//}
