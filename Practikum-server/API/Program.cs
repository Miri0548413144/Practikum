using Core;
using Core.Repositories;
using Core.Sevices;
using Data;
using Data.Repositories;
using Service;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using API;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(opt => opt.AddPolicy("MyPolicy", policy => { policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod(); })); ;
builder.Services.AddScoped<IWorkerService,WorkerService>();
builder.Services.AddScoped<IWorkerRepository,WorkerRepository>();
builder.Services.AddScoped<IRoleService,RoleService>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddDbContext<DataContext>();
builder.Services.AddAutoMapper(typeof(MappingProfile),typeof(APIMapping));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("MyPolicy");
app.UseAuthorization();

app.MapControllers();

app.Run();
