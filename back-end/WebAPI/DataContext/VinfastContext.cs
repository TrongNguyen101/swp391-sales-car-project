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
        public DbSet<CarColor> CarColor { get; set; }
        public DbSet<CarDeposit> CarDeposit { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<TestDriveRegistration> TestDriveRegistrations { get; set; }
        public DbSet<Accessory> Accessories { get; set; }
        public DbSet<AccessoryImage> AccessoryImages { get; set; }
        public DbSet<CartItem> CartItems { get; set; }

        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceItem> InvoiceItems { get; set; }

        public DbSet<Payment> Payments { get; set; }
        public DbSet<ImportExportHistory> ImportExportHistories { get; set; }


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
            modelBuilder.Entity<CarColor>().HasData(
                new CarColor
                {
                    ColorId = 1,
                    ColorName = "White",
                    ColorImage = "vinfast-vf3-white.png",
                    IsDeleted = false,
                    CarId = 1
                },

                new CarColor
                {
                    ColorId = 2,
                    ColorName = "Grey",
                    ColorImage = "vinfast-vf3-grey.png",
                    IsDeleted = false,
                    CarId = 1
                },

                new CarColor
                {
                    ColorId = 3,
                    ColorName = "Red",
                    ColorImage = "vinfast-vf3-red.png",
                    IsDeleted = false,
                    CarId = 1
                },

                new CarColor
                {
                    ColorId = 4,
                    ColorName = "Yellow",
                    ColorImage = "vinfast-vf3-yellow.png",
                    IsDeleted = false,
                    CarId = 1
                },

                new CarColor
                {
                    ColorId = 5,
                    ColorName = "Green",
                    ColorImage = "vinfast-vf3-green.png",
                    IsDeleted = false,
                    CarId = 1
                },
                new CarColor
                {
                    ColorId = 6,
                    ColorName = "White",
                    ColorImage = "vinfast-vf5-white.png",
                    IsDeleted = false,
                    CarId = 2
                },
                new CarColor
                {
                    ColorId = 7,
                    ColorName = "Grey",
                    ColorImage = "vinfast-vf5-grey.png",
                    IsDeleted = false,
                    CarId = 2
                },
                new CarColor
                {
                    ColorId = 8,
                    ColorName = "Red",
                    ColorImage = "vinfast-vf5-red.png",
                    IsDeleted = false,
                    CarId = 2
                },
                new CarColor
                {
                    ColorId = 9,
                    ColorName = "Yellow",
                    ColorImage = "vinfast-vf5-yellow.png",
                    IsDeleted = false,
                    CarId = 2
                },
                new CarColor
                {
                    ColorId = 10,
                    ColorName = "Green",
                    ColorImage = "vinfast-vf5-green.png",
                    IsDeleted = false,
                    CarId = 2
                },
                new CarColor
                {
                    ColorId = 11,
                    ColorName = "White",
                    ColorImage = "vinfast-vf6-white.png",
                    IsDeleted = false,
                    CarId = 3
                },
                new CarColor
                {
                    ColorId = 12,
                    ColorName = "Black",
                    ColorImage = "vinfast-vf6-black.png",
                    IsDeleted = false,
                    CarId = 3
                },
                new CarColor
                {
                    ColorId = 13,
                    ColorName = "Red",
                    ColorImage = "vinfast-vf6-red.png",
                    IsDeleted = false,
                    CarId = 3
                },
                new CarColor
                {
                    ColorId = 14,
                    ColorName = "Green",
                    ColorImage = "vinfast-vf6-green.png",
                    IsDeleted = false,
                    CarId = 3
                },
                new CarColor
                {
                    ColorId = 15,
                    ColorName = "Blue",
                    ColorImage = "vinfast-vf6-blue.png",
                    IsDeleted = false,
                    CarId = 3
                },
                new CarColor
                {
                    ColorId = 16,
                    ColorName = "White",
                    ColorImage = "vinfast-vf7-white.png",
                    IsDeleted = false,
                    CarId = 4
                },
                new CarColor
                {
                    ColorId = 17,
                    ColorName = "Black",
                    ColorImage = "vinfast-vf7-black.png",
                    IsDeleted = false,
                    CarId = 4
                },
                new CarColor
                {
                    ColorId = 18,
                    ColorName = "Red",
                    ColorImage = "vinfast-vf7-red.png",
                    IsDeleted = false,
                    CarId = 4
                },
                new CarColor
                {
                    ColorId = 19,
                    ColorName = "Green",
                    ColorImage = "vinfast-vf7-green.png",
                    IsDeleted = false,
                    CarId = 4
                },
                new CarColor
                {
                    ColorId = 20,
                    ColorName = "Blue",
                    ColorImage = "vinfast-vf7-blue.png",
                    IsDeleted = false,
                    CarId = 4
                },
                new CarColor
                {
                    ColorId = 21,
                    ColorName = "White",
                    ColorImage = "vinfast-vf8-white.png",
                    IsDeleted = false,
                    CarId = 5
                },
                new CarColor
                {
                    ColorId = 22,
                    ColorName = "Black",
                    ColorImage = "vinfast-vf8-black.png",
                    IsDeleted = false,
                    CarId = 5
                },
                new CarColor
                {
                    ColorId = 23,
                    ColorName = "Red",
                    ColorImage = "vinfast-vf8-red.png",
                    IsDeleted = false,
                    CarId = 5
                },
                new CarColor
                {
                    ColorId = 24,
                    ColorName = "Green",
                    ColorImage = "vinfast-vf8-green.png",
                    IsDeleted = false,
                    CarId = 5
                },
                new CarColor
                {
                    ColorId = 25,
                    ColorName = "Blue",
                    ColorImage = "vinfast-vf8-blue.png",
                    IsDeleted = false,
                    CarId = 5
                },
                new CarColor
                {
                    ColorId = 26,
                    ColorName = "White",
                    ColorImage = "vinfast-vf9-white.png",
                    IsDeleted = false,
                    CarId = 6
                },
                new CarColor
                {
                    ColorId = 27,
                    ColorName = "Black",
                    ColorImage = "vinfast-vf9-black.png",
                    IsDeleted = false,
                    CarId = 6
                },
                new CarColor
                {
                    ColorId = 28,
                    ColorName = "Red",
                    ColorImage = "vinfast-vf9-red.png",
                    IsDeleted = false,
                    CarId = 6
                },
                new CarColor
                {
                    ColorId = 29,
                    ColorName = "Green",
                    ColorImage = "vinfast-vf9-green.png",
                    IsDeleted = false,
                    CarId = 6
                },
                new CarColor
                {
                    ColorId = 30,
                    ColorName = "Blue",
                    ColorImage = "vinfast-vf9-blue.png",
                    IsDeleted = false,
                    CarId = 6
                }
            );

            modelBuilder.Entity<Cars>().HasData(
               new Cars
               {
                   Id = 1,
                   Name = "Vinfast VF3",
                   Seats = 4,
                   Image = "vinfast-vf3.png",
                   SpecImage = "vinfast-vf3-spec.png",
                   ImageBanner = "vinfast-banner.png",
                   Quantity = 10,
                   PriceBatteryRental = 240000000,
                   PriceBatteryOwn = 322000000,
                   PriceDeposite = 15000000,
                   IsShowed = true
               },
               new Cars
               {
                   Id = 2,
                   Name = "Vinfast VF5",
                   Seats = 5,
                   Image = "vinfast-vf5.png",
                   SpecImage = "vinfast-vf5-spec.png",
                   ImageBanner = "vinfast-banner.png",
                   Quantity = 10,
                   PriceBatteryRental = 460000000,
                   PriceBatteryOwn = 540000000,
                   PriceDeposite = 20000000,
                   IsShowed = true
               },
               new Cars
               {
                   Id = 3,
                   Name = "Vinfast VF6",
                   Seats = 5,
                   Image = "vinfast-vf6.png",
                   SpecImage = "vinfast-vf6-spec.png",
                   ImageBanner = "vinfast-banner.png",
                   Quantity = 10,
                   PriceBatteryRental = 675000000,
                   PriceBatteryOwn = 765000000,
                   PriceDeposite = 30000000,
                   IsShowed = true
               },
               new Cars
               {
                   Id = 4,
                   Name = "Vinfast VF7",
                   Seats = 5,
                   Image = "vinfast-vf7.png",
                   SpecImage = "vinfast-vf7-spec.png",
                   ImageBanner = "vinfast-banner.png",
                   Quantity = 10,
                   PriceBatteryRental = 850000000,
                   PriceBatteryOwn = 999000000,
                   PriceDeposite = 50000000,
                   IsShowed = true
               },
               new Cars
               {
                   Id = 5,
                   Name = "Vinfast VF8",
                   Seats = 5,
                   Image = "vinfast-vf8.png",
                   SpecImage = "vinfast-vf8-spec.png",
                   ImageBanner = "vinfast-banner.png",
                   Quantity = 10,
                   PriceBatteryRental = 1170000000,
                   PriceBatteryOwn = 1359000000,
                   PriceDeposite = 50000000,
                   IsShowed = true
               },
               new Cars
               {
                   Id = 6,
                   Name = "Vinfast VF9",
                   Seats = 7,
                   Image = "vinfast-vf9.png",
                   SpecImage = "vinfast-vf9-spec.png",
                   ImageBanner = "vinfast-banner.png",
                   Quantity = 10,
                   PriceBatteryRental = 1604000000,
                   PriceBatteryOwn = 2129000000,
                   PriceDeposite = 50000000,
                   IsShowed = true
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
                    RoleName = "Customer"
                },
                new Roles
                {
                    RoleId = 3,
                    RoleName = "Staff"
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
                    Password = EncyptHelper.Sha256Encrypt("Admin@123345"), // Note: In a real application, store hashed passwords
                    CreatedAt = new DateTime(2023, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                    IsDeleted = false,
                    LastChange = new DateTime(2023, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                    RoleId = 1
                },
                new Users
                {
                    Id = new Guid("e4b8a1e1-5d4b-5c4b-9a1e-2d4b5c4b9a1e"),
                    UserName = "User A",
                    Address = "456 User St",
                    Phone = "0987654321",
                    Email = "user@example.com",
                    Password = EncyptHelper.Sha256Encrypt("User@12345"), // Note: In a real application, store hashed passwords
                    CreatedAt = new DateTime(2023, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                    IsDeleted = false,
                    LastChange = new DateTime(2023, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                    RoleId = 2
                },
                new Users
                {
                    Id = new Guid("5168db79-a770-472d-82ed-061cba60f1e1"),
                    UserName = "Nguyen Trong",
                    Address = "456 User St",
                    Phone = "0987654321",
                    Email = "nguyentrong.se11@gmail.com",
                    Password = EncyptHelper.Sha256Encrypt("User@12345"), // Note: In a real application, store hashed passwords
                    CreatedAt = new DateTime(2023, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                    IsDeleted = false,
                    LastChange = new DateTime(2023, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                    RoleId = 2
                },
                new Users
                {
                    Id = new Guid("1f2628eb-34bf-4e4b-a9d2-308827bed09a"),
                    UserName = "Nguyen Duong Phu Trong",
                    Address = "456 User St",
                    Phone = "0987654321",
                    Email = "staff@gmail.com",
                    Password = EncyptHelper.Sha256Encrypt("Staff@12345"), // Note: In a real application, store hashed passwords
                    CreatedAt = new DateTime(2023, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                    IsDeleted = false,
                    LastChange = new DateTime(2023, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                    RoleId = 3
                }
            );

            // Seed the database with initial data
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasData(
                    new Category
                    {
                        Id = 1,
                        Name = "Common car accessories",
                        ParentsId = 0,
                        IsDeleted = false
                    },
                    new Category
                    {
                        Id = 2,
                        Name = "Electric car accessories",
                        ParentsId = 0,
                        IsDeleted = false
                    },
                    new Category
                    {
                        Id = 3,
                        Name = "Accessories of VF3",
                        ParentsId = 2,
                        IsDeleted = false
                    },
                    new Category
                    {
                        Id = 4,
                        Name = "Accessories of VF5",
                        ParentsId = 2,
                        IsDeleted = false
                    },
                    new Category
                    {
                        Id = 5,
                        Name = "Accessories of VF6",
                        ParentsId = 2,
                        IsDeleted = false
                    },
                    new Category
                    {
                        Id = 6,
                        Name = "Accessories of VF7",
                        ParentsId = 2,
                        IsDeleted = false
                    },
                    new Category
                    {
                        Id = 7,
                        Name = "Accessories of VF8",
                        ParentsId = 2,
                        IsDeleted = false
                    },
                    new Category
                    {
                        Id = 8,
                        Name = "Accessories of VF9",
                        ParentsId = 2,
                        IsDeleted = false
                    }
                );

            });

            modelBuilder.Entity<Accessory>(entity =>
            {
                entity.HasData(
                    new Accessory
                    {
                        Id = 1,
                        Name = "VinFast Home Charger",
                        Price = 6000000,
                        Quantity = 10,
                        Image = "Sac_tai_nha.png",
                        CategoryId = 1,
                        IsDeleted = false,
                        IsShowed = true,
                        Origin = "Vietnam",
                        Dimensions = "30x20x10 cm",
                        Weight = 2.5,
                        Material = "Plastic",
                        Color = "White",
                        Warranty = "1 year",
                        Description = "A convenient home charger for your VinFast electric vehicle."
                    },
                    new Accessory
                    {
                        Id = 2,
                        Name = "VF3 Plastic Carpet",
                        Price = 1668000,
                        Quantity = 10,
                        Image = "VF3_tham_nhua.png",
                        CategoryId = 3,
                        IsDeleted = false,
                        IsShowed = true,
                        Origin = "Vietnam",
                        Dimensions = "50x40x5 cm",
                        Weight = 1.2,
                        Material = "Rubber",
                        Color = "Black",
                        Warranty = "6 months",
                        Description = "Durable rubber floor mats for the VinFast VF3."
                    },
                    new Accessory
                    {
                        Id = 3,
                        Name = "VF 3 Rear Camera",
                        Price = 26720000,
                        Quantity = 10,
                        Image = "VF3_Camera_lui.png",
                        CategoryId = 3,
                        IsDeleted = false,
                        IsShowed = true,
                        Origin = "Japan",
                        Dimensions = "10x5x5 cm",
                        Weight = 0.3,
                        Material = "Metal",
                        Color = "Black",
                        Warranty = "2 years",
                        Description = "High-quality rearview camera for the VinFast VF3."
                    },
                    new Accessory
                    {
                        Id = 4,
                        Name = "VF 5 Plastic Floor Mats",
                        Price = 1969000,
                        Quantity = 10,
                        Image = "VF5_tham_nhua.png",
                        CategoryId = 4,
                        IsDeleted = false,
                        IsShowed = true,
                        Origin = "Vietnam",
                        Dimensions = "50x40x5 cm",
                        Weight = 1.2,
                        Material = "Rubber",
                        Color = "Black",
                        Warranty = "6 months",
                        Description = "Durable rubber floor mats for the VinFast VF5."
                    },
                    new Accessory
                    {
                        Id = 5,
                        Name = "VF 5 Heat Insulation Film Package",
                        Price = 5500000,
                        Quantity = 10,
                        Image = "VF5_Goi_dan_phim_cach_nhiet.png",
                        CategoryId = 4,
                        IsDeleted = false,
                        IsShowed = true,
                        Origin = "Vietnam",
                        Dimensions = "100x50x0.1 cm",
                        Weight = 0.5,
                        Material = "Film",
                        Color = "Transparent",
                        Warranty = "1 year",
                        Description = "Heat-resistant film package for the VinFast VF5."
                    },
                    new Accessory
                    {
                        Id = 6,
                        Name = "VF 5 3D Trunk Mat",
                        Price = 990000,
                        Quantity = 10,
                        Image = "VF5_Tham_cop.png",
                        CategoryId = 4,
                        IsDeleted = false,
                        IsShowed = true,
                        Origin = "Vietnam",
                        Dimensions = "100x80x5 cm",
                        Weight = 2.0,
                        Material = "Rubber",
                        Color = "Black",
                        Warranty = "6 months",
                        Description = "3D trunk mat for the VinFast VF5."
                    },
                    new Accessory
                    {
                        Id = 7,
                        Name = "VF 6 Heat Insulation Film Package",
                        Price = 5500000,
                        Quantity = 10,
                        Image = "VF6_Goi_dan_phim_cach_nhiet.png",
                        CategoryId = 5,
                        IsDeleted = false,
                        IsShowed = true,
                        Origin = "Vietnam",
                        Dimensions = "100x50x0.1 cm",
                        Weight = 0.5,
                        Material = "Film",
                        Color = "Transparent",
                        Warranty = "1 year",
                        Description = "Heat-resistant film package for the VinFast VF6."
                    },
                    new Accessory
                    {
                        Id = 8,
                        Name = "VF 6 3D Plastic Floor Mats",
                        Price = 1990000,
                        Quantity = 10,
                        Image = "VF6_tham_nhua.png",
                        CategoryId = 5,
                        IsDeleted = false,
                        IsShowed = true,
                        Origin = "Vietnam",
                        Dimensions = "50x40x5 cm",
                        Weight = 1.2,
                        Material = "Rubber",
                        Color = "Black",
                        Warranty = "6 months",
                        Description = "Durable rubber floor mats for the VinFast VF6."
                    },
                    new Accessory
                    {
                        Id = 9,
                        Name = "VF 6 3D Trunk Mat",
                        Price = 990000,
                        Quantity = 10,
                        Image = "VF6_Tham_cop.png",
                        CategoryId = 5,
                        IsDeleted = false,
                        IsShowed = true,
                        Origin = "Vietnam",
                        Dimensions = "100x80x5 cm",
                        Weight = 2.0,
                        Material = "Rubber",
                        Color = "Black",
                        Warranty = "6 months",
                        Description = "3D trunk mat for the VinFast VF6."
                    },
                    new Accessory
                    {
                        Id = 201,
                        Name = "VF 7 3D Trunk Mat",
                        Price = 990000,
                        Quantity = 8,
                        Image = "Tham_Cop_3D_VF7.png",
                        CategoryId = 5,
                        IsDeleted = false,
                        IsShowed = true,
                        Origin = "Vietnam",
                        Dimensions = "100x80x5 cm",
                        Weight = 2.0,
                        Material = "Rubber",
                        Color = "Black",
                        Warranty = "6 months",
                        Description = "3D trunk mat for the VinFast VF7."
                    },
                    new Accessory
                    {
                        Id = 202,
                        Name = "VF 7 Heat Insulation Film Package",
                        Price = 5500000,
                        Quantity = 10,
                        Image = "Goi_Dan_Film_Cach_Nhiet_VinFast_VF7.png",
                        CategoryId = 6,
                        IsDeleted = false,
                        IsShowed = true,
                        Origin = "Vietnam",
                        Dimensions = "100x80x5 cm",
                        Weight = 2.0,
                        Material = "Rubber",
                        Color = "Black",
                        Warranty = "6 months",
                        Description = "VF x 3M heat insulation film products help insulate, block infrared radiation, eliminate UV rays, effectively reduce glare to improve the customer experience in the car, protect customers from harmful rays as well as increase the durability of the car's interior. Warranty."
                    },
                    new Accessory
                    {
                        Id = 203,
                        Name = "3D Floor Mat VF 7",
                        Price = 540000,
                        Quantity = 10,
                        Image = "Tham_San_3D_VF_7.png",
                        CategoryId = 6,
                        IsDeleted = false,
                        IsShowed = true,
                        Origin = "Vietnam",
                        Dimensions = "100x80x5 cm",
                        Weight = 2.0,
                        Material = " TPE plastic",
                        Color = "Black",
                        Warranty = "6 months",
                        Description = "VinFast VF 7 floor mats are molded mats manufactured in Vietnam, according to Japanese production lines. Made from high-quality, non-toxic TPE plastic material."
                    },
                    new Accessory
                    {
                        Id = 204,
                        Name = "VinFast VF8 Car Roof Top Box",
                        Price = 7000000,
                        Quantity = 10,
                        Image = "Cop_Noc_Phi_Thuyen_Oto_VinFast_ VF8.png",
                        CategoryId = 7,
                        IsDeleted = false,
                        IsShowed = true,
                        Origin = "Vietnam",
                        Dimensions = "100x80x5 cm",
                        Weight = 2.0,
                        Material = "Rubber",
                        Color = "Black",
                        Warranty = "6 months",
                        Description = "The car roof rack for VinFast VF 8 is an ideal choice to expand storage space during journeys. Modern, convenient design with superior quality, the product brings convenience and style to every trip."
                    },
                    new Accessory
                    {
                        Id = 205,
                        Name = "2D VF8 Plastic Floor Mats",
                        Price = 2210000,
                        Quantity = 10,
                        Image = "Tham_San_Nhua_2D_VF8.png",
                        CategoryId = 7,
                        IsDeleted = false,
                        IsShowed = true,
                        Origin = "Vietnam",
                        Dimensions = "100x80x5 cm",
                        Weight = 2.0,
                        Material = "Plastic",
                        Color = "Black",
                        Warranty = "6 months",
                        Description = "VinFast VF 8 floor mats are molded mats manufactured in Vietnam, according to Japanese production lines. Made from high-quality, non-toxic TPE plastic material."
                    },
                    new Accessory
                    {
                        Id = 206,
                        Name = "Ceiling Heat Insulation Film Package",
                        Price = 7000000,
                        Quantity = 10,
                        Image = "Goi_Film_Cach_Nhiet_Dan_Tran_VinFast_VF8.png",
                        CategoryId = 7,
                        IsDeleted = false,
                        IsShowed = true,
                        Origin = "Vietnam",
                        Dimensions = "100x80x5cm",
                        Weight = 2.0,
                        Material = "Titanium",
                        Color = "Black",
                        Warranty = "6 months",
                        Description = "VF x 3M heat insulation film products help insulate, block infrared radiation, eliminate UV rays, effectively reduce glare to improve the customer experience in the car, protect customers from harmful rays as well as increase the durability of the car's interior. Warranty"
                    }
                );
            });

            modelBuilder.Entity<AccessoryImage>().HasData(
                new AccessoryImage
                {
                    ColorId = 1,
                    ColorName = "White",
                    ColorImage = "homecharger-1.png",
                    IsDeleted = false,
                    AccessoryId = 1
                },

                new AccessoryImage
                {
                    ColorId = 2,
                    ColorName = "White",
                    ColorImage = "homecharger-2.png",
                    IsDeleted = false,
                    AccessoryId = 1
                },

                new AccessoryImage
                {
                    ColorId = 3,
                    ColorName = "White",
                    ColorImage = "homecharger-3.png",
                    IsDeleted = false,
                    AccessoryId = 1
                },

                new AccessoryImage
                {
                    ColorId = 4,
                    ColorName = "White",
                    ColorImage = "homecharger-4.png",
                    IsDeleted = false,
                    AccessoryId = 1
                },
                new AccessoryImage
                {
                    ColorId = 5,
                    ColorName = "White",
                    ColorImage = "VF3_tham_nhua_detail1.png",
                    IsDeleted = false,
                    AccessoryId = 2
                },

                new AccessoryImage
                {
                    ColorId = 6,
                    ColorName = "White",
                    ColorImage = "VF3_tham_nhua_detail2.png",
                    IsDeleted = false,
                    AccessoryId = 2
                },

                new AccessoryImage
                {
                    ColorId = 7,
                    ColorName = "White",
                    ColorImage = "VF3_camera_lui_1.jpg",
                    IsDeleted = false,
                    AccessoryId = 3
                },

                new AccessoryImage
                {
                    ColorId = 8,
                    ColorName = "White",
                    ColorImage = "VF3_camera_lui_2.jpg",
                    IsDeleted = false,
                    AccessoryId = 3
                },
                new AccessoryImage
                {
                    ColorId = 201,
                    ColorName = "White",
                    ColorImage = "Tham_Cop_3D_VF7.png",
                    IsDeleted = false,
                    AccessoryId = 201
                },
                new AccessoryImage
                {
                    ColorId = 202,
                    ColorName = "White",
                    ColorImage = "Goi_Dan_Film_Cach_Nhiet_VinFast_VF7.png",
                    IsDeleted = false,
                    AccessoryId = 202
                },
                new AccessoryImage
                {
                    ColorId = 203,
                    ColorName = "White",
                    ColorImage = "Tham_San_3D_VF_7.png",
                    IsDeleted = false,
                    AccessoryId = 203
                },
                new AccessoryImage
                {
                    ColorId = 204,
                    ColorName = "White",
                    ColorImage = "Tham_San_3D_VF72.png",
                    IsDeleted = false,
                    AccessoryId = 203
                },
                new AccessoryImage
                {
                    ColorId = 205,
                    ColorName = "White",
                    ColorImage = "Cop_Noc_Phi_Thuyen_Oto_VinFast_ VF8.png",
                    IsDeleted = false,
                    AccessoryId = 204
                },
                new AccessoryImage
                {
                    ColorId = 206,
                    ColorName = "White",
                    ColorImage = "Cop_Noc_Phi_Thuyen_O_To_VinFast_VF82.png",
                    IsDeleted = false,
                    AccessoryId = 204
                },
                new AccessoryImage
                {
                    ColorId = 207,
                    ColorName = "White",
                    ColorImage = "Tham_San_Nhua_2D_VF8.png",
                    IsDeleted = false,
                    AccessoryId = 205
                },
                new AccessoryImage
                {
                    ColorId = 208,
                    ColorName = "White",
                    ColorImage = "Tham_San_Nhua_2D_VF82.png",
                    IsDeleted = false,
                    AccessoryId = 205
                },
                new AccessoryImage
                {
                    ColorId = 209,
                    ColorName = "White",
                    ColorImage = "Tham_San_Nhua_2D_VF83.png",
                    IsDeleted = false,
                    AccessoryId = 205
                },
                new AccessoryImage
                {
                    ColorId = 210,
                    ColorName = "White",
                    ColorImage = "Tham_San_Nhua_2D_VF84.png",
                    IsDeleted = false,
                    AccessoryId = 205
                },
                new AccessoryImage
                {
                    ColorId = 211,
                    ColorName = "White",
                    ColorImage = "Goi_Film_Cach_Nhiet_Dan_Tran_VinFast_VF8.png",
                    IsDeleted = false,
                    AccessoryId = 206
                },
                // VF5 - VF6
                new AccessoryImage
                {
                    ColorId = 212,
                    ColorName = "White",
                    ColorImage = "VF5_tham_nhua.png",
                    IsDeleted = false,
                    AccessoryId = 4
                },
                new AccessoryImage
                {
                    ColorId = 213,
                    ColorName = "White",
                    ColorImage = "Tham San Nhua 2D VF 52.png",
                    IsDeleted = false,
                    AccessoryId = 4
                },
                new AccessoryImage
                {
                    ColorId = 214,
                    ColorName = "White",
                    ColorImage = "Tham San Nhua 2D VF 53.png",
                    IsDeleted = false,
                    AccessoryId = 4
                },
                new AccessoryImage
                {
                    ColorId = 215,
                    ColorName = "White",
                    ColorImage = "Tham San Nhua 2D VF 54.png",
                    IsDeleted = false,
                    AccessoryId = 4
                },
                new AccessoryImage
                {
                    ColorId = 216,
                    ColorName = "White",
                    ColorImage = "Tham San Nhua 2D VF 55.png",
                    IsDeleted = false,
                    AccessoryId = 4
                },
                new AccessoryImage
                {
                    ColorId = 217,
                    ColorName = "White",
                    ColorImage = "VF6_Tham_cop.png",
                    IsDeleted = false,
                    AccessoryId = 9
                },
                new AccessoryImage
                {
                    ColorId = 218,
                    ColorName = "White",
                    ColorImage = "Tham Cop 3D VF 62.png",
                    IsDeleted = false,
                    AccessoryId = 9
                },
                new AccessoryImage
                {
                    ColorId = 219,
                    ColorName = "White",
                    ColorImage = "VF6_tham_nhua.png",
                    IsDeleted = false,
                    AccessoryId = 8
                },
                new AccessoryImage
                {
                    ColorId = 220,
                    ColorName = "White",
                    ColorImage = "Tham San Nhua 2D VF 62.png",
                    IsDeleted = false,
                    AccessoryId = 8
                },
                new AccessoryImage
                {
                    ColorId = 221,
                    ColorName = "White",
                    ColorImage = "VF6_Goi_dan_phim_cach_nhiet.png",
                    IsDeleted = false,
                    AccessoryId = 7
                },
                new AccessoryImage
                {
                    ColorId = 222,
                    ColorName = "White",
                    ColorImage = "VF5_Goi_dan_phim_cach_nhiet.png",
                    IsDeleted = false,
                    AccessoryId = 5
                },
                new AccessoryImage
                {
                    ColorId = 223,
                    ColorName = "White",
                    ColorImage = "VF5_Tham_cop.png",
                    IsDeleted = false,
                    AccessoryId = 6
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

            modelBuilder.Entity<Cars>(entity =>
            {
                entity.HasMany(color => color.CarColors)
                      .WithOne(car => car.Car)
                      .HasForeignKey(car => car.CarId)
                      .IsRequired();
            });

            modelBuilder.Entity<Cars>(entity =>
            {
                entity.HasMany(carDeposit => carDeposit.CarDeposits)
                      .WithOne(deposit => deposit.Car)
                      .HasForeignKey(user => user.CarId)
                      .IsRequired();
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasMany(carDeposit => carDeposit.CarDeposits)
                      .WithOne(user => user.User)
                      .HasForeignKey(user => user.UserId)
                      .IsRequired();
            });

            modelBuilder.Entity<Accessory>(entity =>
            {
                entity.HasOne(accessory => accessory.Category)
                      .WithMany(category => category.Accessories)
                      .HasForeignKey(accessory => accessory.CategoryId)
                      .OnDelete(DeleteBehavior.Cascade)
                      .IsRequired();
            });

            modelBuilder.Entity<Accessory>(entity =>
            {
                entity.HasMany(image => image.AccessoryImages)
                      .WithOne(accessory => accessory.Accessory)
                      .HasForeignKey(accessory => accessory.AccessoryId)
                      .IsRequired();
            });

            modelBuilder.Entity<CartItem>(entity =>
            {
                entity.HasOne(cartItem => cartItem.User)
                      .WithMany(user => user.CartItems)
                      .HasForeignKey(cartItem => cartItem.UserId)
                      .IsRequired();
            });

            modelBuilder.Entity<CartItem>(entity =>
            {
                entity.HasOne(cartItem => cartItem.Product)
                      .WithMany(product => product.CartItems)
                      .HasForeignKey(cartItem => cartItem.ProductId)
                      .IsRequired();
            });

            // Configure the relationship between import and export history with accessory and car
            modelBuilder.Entity<ImportExportHistory>(entity =>
            {
                entity.HasOne(imExHis => imExHis.Accessory)
                      .WithMany(accessory => accessory.ImportExportHistories)
                      .HasForeignKey(imExHis => imExHis.AccessoryId);
            });

            modelBuilder.Entity<ImportExportHistory>(entity =>
           {
               entity.HasOne(imExHis => imExHis.Car)
                     .WithMany(car => car.ImportExportHistories)
                     .HasForeignKey(imExHis => imExHis.CarId);
           });


            modelBuilder.Entity<CartItem>(entity =>
            {
                entity.HasOne(cartItem => cartItem.Product)
                      .WithMany(product => product.CartItems)
                      .HasForeignKey(cartItem => cartItem.ProductId)
                      .IsRequired();
            });

            modelBuilder.Entity<Invoice>(entity =>
            {
                entity.HasMany(i => i.InvoiceItems)
                      .WithOne(ii => ii.Invoice)
                      .HasForeignKey(ii => ii.InvoiceId)
                      .OnDelete(DeleteBehavior.Cascade)
                      .IsRequired();
            });
            modelBuilder.Entity<Invoice>(entity =>
            {
                entity.HasOne(i => i.User)
                      .WithMany(u => u.Invoices)
                      .HasForeignKey(i => i.UserId)
                      .OnDelete(DeleteBehavior.Cascade)
                      .IsRequired();
            });

            modelBuilder.Entity<Cars>(entity =>
            {
                entity.HasMany(car => car.InvoiceItems)
                      .WithOne(invoice => invoice.Car)
                      .HasForeignKey(car => car.CarId)
                      .OnDelete(DeleteBehavior.Cascade);
            });


            modelBuilder.Entity<Accessory>(entity =>
            {
                entity.HasMany(a => a.InvoiceItems)
                      .WithOne(invoice => invoice.Accessory)
                      .HasForeignKey(a => a.AccessoryId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Invoice>(entity =>
            {
                entity.HasMany(a => a.Payments)
                      .WithOne(pay => pay.Invoice)
                      .HasForeignKey(a => a.InvoiceId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

        }
    }
}
