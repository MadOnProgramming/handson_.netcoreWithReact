using Application.Activities;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

#region Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//register service for db context
builder.Services.AddDbContext<DataContext>(opt =>
{
    //database configuration
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

//register service for applying CORS
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("MyCorsPolicy", bui =>
    {
        bui.AllowAnyHeader()
            .AllowAnyMethod()
            .WithOrigins("http://localhost:5001");
    });
});
//register MediatR service
builder.Services.AddMediatR(conf =>
{
    //we need to say where it can find handlers from
    conf.RegisterServicesFromAssembly(typeof(List.Handler).Assembly);
});

#endregion
var app = builder.Build();

#region Configuring middleware

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();

//add CORS middleware
app.UseCors("MyCorsPolicy");

app.UseAuthorization();
app.MapControllers();
#endregion

#region doing database migrations
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during database migration");
}
#endregion

app.Run();
