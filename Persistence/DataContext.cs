using Microsoft.EntityFrameworkCore;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {

        public DbSet<Activity> Activities { get; set; }

        public DataContext(DbContextOptions options): base(options)
        {
            
        }

    }
}