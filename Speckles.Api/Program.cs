using System.Reflection;
using System.Text;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Speckles.Api;
using Speckles.Api.Lib;
using Speckles.Api.Mappings;
using Speckles.Database;

var builder = WebApplication.CreateBuilder(args);

// Custom configuration
builder.Configuration.AddJsonFile("appsettings.Api.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.Api.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
                       throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));
builder.Services.AddScoped<DatabaseService>();

// Json options
builder.Services.AddControllers().AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendCors",
        builder => builder
            .WithOrigins("http://localhost:3000", "http://speckles.store", "https://speckles.store")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials());
});

// Bearer token authentication
builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("hIpgKAmTxEkynWKUdINGxEYgsFd/pDoL28ChZCiLifk=")) // builder.Configuration["JWT_SECRET"]
        };
    });

// Swagger docs
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo()
    {
        Title = "Speckles Developer API",
        Version = "v1",
        TermsOfService = new Uri("https://speckles.store/terms-and-conditions"),
        Contact = new OpenApiContact()
        {
            Name = "Speckles",
            Email = "info@speckles.store",
        },
        License = new OpenApiLicense()
        {
            Name = "Speckles license",
            Url = new Uri("https://speckles.store/license"),
        },
        Description = "The Speckles Developer API provides seamless access to the Speckles platform, empowering developers to integrate with our vibrant community of graphic designers and their high-quality digital products. Designed for flexibility and ease of use, the API enables e-commerce, design, and creative applications to interact directly with Speckles' rich catalog of premium assets, helping developers build personalized shopping experiences, integrate with third-party applications, and unlock new ways to support and monetize creative products."
    });

    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});

// Mapster configuration
MapsterConfiguration.Configure();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    options.RoutePrefix = string.Empty;
});

app.UseCors("FrontendCors");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();