using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Utils.EncyptHelper;

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

        public DbSet<Cars> Cars { get; set; }

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
            modelBuilder.Entity<Cars>().HasData(
               new Cars
               {
                   Id = 1,
                   Name = "VF 3",
                   Seats = 4,
                   Image = "vinfast-vf3.png",
                   SpecImage = "vinfast-vf3-spec.png",
                   ColorImage1 = "vinfast-vf3-white.png",
                   ColorImage2 = "vinfast-vf3-grey.png",
                   ColorImage3 = "vinfast-vf3-red.png",
                   ImageBanner = "vinfast-vf3-banner.png",
                   PriceBatteryRental = 240000000,
                   PriceBatteryOwn = 322000000,
                   PriceDeposite = 15000000
               },
               new Cars
               {
                   Id = 2,
                   Name = "VF 5",
                   Seats = 5,
                   Image = "vinfast-vf5.png",
                   SpecImage = null,
                   ColorImage1 = null,
                   ColorImage2 = null,
                   ColorImage3 = null,
                   ImageBanner = null,
                   PriceBatteryRental = 460000000,
                   PriceBatteryOwn = 540000000,
                   PriceDeposite = 20000000
               },
               new Cars
               {
                   Id = 3,
                   Name = "VF 6",
                   Seats = 5,
                   Image = "vinfast-vf6.png",
                   SpecImage = null,
                   ColorImage1 = null,
                   ColorImage2 = null,
                   ColorImage3 = null,
                   ImageBanner = null,
                   PriceBatteryRental = 675000000,
                   PriceBatteryOwn = 765000000,
                   PriceDeposite = 30000000
               },
               new Cars
               {
                   Id = 4,
                   Name = "VF 7",
                   Seats = 5,
                   Image = "vinfast-vf7.png",
                   SpecImage = null,
                   ColorImage1 = null,
                   ColorImage2 = null,
                   ColorImage3 = null,
                   ImageBanner = null,
                   PriceBatteryRental = 850000000,
                   PriceBatteryOwn = 999000000,
                   PriceDeposite = 50000000
               },
               new Cars
               {
                   Id = 5,
                   Name = "VF 8",
                   Seats = 5,
                   Image = "vinfast-vf8.png",
                   SpecImage = null,
                   ColorImage1 = null,
                   ColorImage2 = null,
                   ColorImage3 = null,
                   ImageBanner = null,
                   PriceBatteryRental = 1170000000,
                   PriceBatteryOwn = 1359000000,
                   PriceDeposite = 50000000
               },
               new Cars
               {
                   Id = 6,
                   Name = "VF 9",
                   Seats = 7,
                   Image = "vinfast-vf9.png",
                   SpecImage = null,
                   ColorImage1 = null,
                   ColorImage2 = null,
                   ColorImage3 = null,
                   ImageBanner = null,
                   PriceBatteryRental = 1604000000,
                   PriceBatteryOwn = 2129000000,
                   PriceDeposite = 50000000
               }
            );
            // Seed the database with initial data
            modelBuilder.Entity<Roles>().HasData(
                new Roles
                {
                    RoleId = 1,
                    RoleName = "Admin"
                },
                new Roles
                {
                    RoleId = 2,
                    RoleName = "User"
                }
            );

            // Seed the database with initial data
            modelBuilder.Entity<Users>().HasData(
                new Users
                {
                    Id = new Guid("d3b8a1e1-4d3b-4c3b-8a1e-1d3b4c3b8a1e"),
                    UserName = "admin",
                    Address = "123 Admin St",
                    Phone = "1234567890",
                    Email = "admin@example.com",
                    Password = EncyptHelper.Sha256Encrypt("admin@123345"), // Note: In a real application, store hashed passwords
                    CreatedAt = new DateTime(2023, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                    IsDeleted = false,
                    LastChange = new DateTime(2023, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                    RoleId = 1
                },
                new Users
                {
                    Id = new Guid("e4b8a1e1-5d4b-5c4b-9a1e-2d4b5c4b9a1e"),
                    UserName = "user",
                    Address = "456 User St",
                    Phone = "0987654321",
                    Email = "user@example.com",
                    Password = EncyptHelper.Sha256Encrypt("user@12345"), // Note: In a real application, store hashed passwords
                    CreatedAt = new DateTime(2023, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                    IsDeleted = false,
                    LastChange = new DateTime(2023, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                    RoleId = 2
                }
            );

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
