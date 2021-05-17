using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using todoapp_server.Entities;

namespace todoapp_server.Data
{
    public class PostgreSqlContext : IdentityDbContext<AppUser>
    {
        public PostgreSqlContext(DbContextOptions<PostgreSqlContext> options) : base(options)
        {
        }

        public DbSet<Todo> Todos { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Todo>()
            .HasOne(t => t.AppUser)
            .WithMany(u => u.Todos)
            .HasForeignKey(t => t.AppUserId)
            .OnDelete(DeleteBehavior.Cascade);
        }


    }
}
