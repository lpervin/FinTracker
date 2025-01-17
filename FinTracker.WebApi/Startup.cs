using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinTracker.Domain.Data;
using FinTracker.Domain.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace FinTracker.WebApi
{
    public class Startup
    {
        private readonly string allowCorsPolicy = "allowAllOrigins";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
                var defaultConnection = Configuration.GetConnectionString("Default");
                services.AddDbContext<FinTrackerContext>(options => options.UseSqlServer(defaultConnection));
                services.AddScoped<IPortfolio, PortfolioRepository>();
                services.AddScoped<IFinSecurity, FinSecurityRepository>();
                services.AddControllers();

                services.AddCors(options =>
                {
                    options.AddPolicy(allowCorsPolicy,
                        builder =>
                        {
                            builder.AllowAnyOrigin()
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                        }
                    );
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
           
            app.UseCors(allowCorsPolicy);
            
            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
