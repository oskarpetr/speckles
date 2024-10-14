using Speckles.Database;

namespace Speckles.Api;

public class DatabaseService
{
    public readonly ApplicationDbContext Database;
    
    public DatabaseService(ApplicationDbContext database)
    {
        Database = database;
    }
}