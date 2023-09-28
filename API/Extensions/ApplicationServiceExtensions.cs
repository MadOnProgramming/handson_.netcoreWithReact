using Application.Activities;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,IConfiguration config)
        {
            //register service for db context
            services.AddDbContext<DataContext>(opt =>
            {
                //database configuration
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });


            //register service for applying CORS
            services.AddCors(opt =>
            {
                opt.AddPolicy("MyCorsPolicy", bui =>
                {
                    bui.AllowAnyHeader()
                        .AllowAnyMethod()
                        .WithOrigins("http://localhost:5001");
                });
            });

            //register MediatR service
            services.AddMediatR(conf =>
            {
                //we need to say where it can find handlers from
                conf.RegisterServicesFromAssembly(typeof(List.Handler).Assembly);
            });

            //register automapper and their mapping profile
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            return services;
        }
    }
}