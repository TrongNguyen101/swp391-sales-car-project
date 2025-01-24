using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using WebAPI.Models;
using System.IO;

namespace WebAPI.DataContext
{
    /// <summary>
    /// Represents the database context for the Vinfast application.
    /// </summary>
    public class VinfastContext : DbContext
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="VinfastContext"/> class.
        /// </summary>
        public VinfastContext()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="VinfastContext"/> class with the specified options.
        /// </summary>
        /// <param name="options">The options to be used by a <see cref="DbContext"/>.</param>
        public VinfastContext(DbContextOptions<VinfastContext> options) : base(options)
        {
        }

        /// <summary>
        /// Gets or sets the Users DbSet.
        /// </summary>
        public DbSet<Users> Users { get; set; }

        /// <summary>
        /// Gets or sets the Roles DbSet.
        /// </summary>
        public DbSet<Roles> Roles { get; set; }

        /// <summary>
        /// Configures the database context options.
        /// </summary>
        /// <param name="optionsBuilder">A builder used to create or modify options for this context.</param>
        /// <summary>
        /// Configures the database context options.
        /// </summary>
        /// <param name="optionsBuilder">A builder used to create or modify options for this context.</param>
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Check if the optionsBuilder is already configured
            if (!optionsBuilder.IsConfigured)
            {
            // Build the configuration from the appsettings.json file
            IConfigurationRoot configuration = new ConfigurationBuilder()
               .SetBasePath(Directory.GetCurrentDirectory())
               .AddJsonFile("appsettings.json")
               .Build();
            
            // Get the connection string from the configuration
            var connectionString = configuration.GetConnectionString("MacConnection");
            
            // Configure the context to use SQL Server with the connection string
            optionsBuilder.UseSqlServer(connectionString);
            }
        }

        /// <summary>
        /// Configures the model that was discovered by convention from the entity types exposed in <see cref="DbSet{TEntity}"/> properties on this context.
        /// </summary>
        /// <param name="modelBuilder">The builder being used to construct the model for this context.</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the relationship between Users and Roles
            modelBuilder.Entity<Users>(entity =>
            {
                // Each User has one Role
                entity.HasOne(user => user.Role)
                      // Each Role can have many Users
                      .WithMany(role => role.Users)
                      // The foreign key in the Users table is RoleId
                      .HasForeignKey(user => user.RoleId)
                      // RoleId is required
                      .IsRequired();
            });
        }
    }
}
