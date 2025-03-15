// filepath: /Users/nguyentrong/swp391-sales-car-project/back-end/WebAPI/Services/MappingService.cs
using System.Globalization;
using WebAPI.Controllers;
using WebAPI.DTO;
using WebAPI.Models;

namespace WebAPI.Utils.AutoMapper
{
    public class AutoMapper
    {
        /// <summary>
        /// Convert User to UserDTO
        /// </summary>
        /// <param name="user"></param>
        /// <returns>Mapp to UserDTO</returns>
        public static UserDTO ToUserDTO(Users user)
        {
            return new UserDTO
            {
                UserId = user.Id,
                UserName = FormatFullname(user.UserName),
                Address = user.Address,
                Phone = user.Phone,
                Email = user.Email,
                CreatedAt = FormatDateTime(user.CreatedAt),
                IsDeleted = FormatBooleanToString(user.IsDeleted),
                LastChange = user.LastChange,
                RoleId = user.RoleId
            };
        }

        /// <summary>
        /// Convert UserDTO to User
        /// </summary>
        /// <param name="userDTO"></param>
        /// <returns>Mapping to User</returns>
        public static Users ToUser(UserDTO userDTO)
        {
            return new Users
            {
                Id = userDTO.UserId,
                UserName = userDTO.UserName,
                Address = userDTO.Address,
                Phone = userDTO.Phone,
                Email = userDTO.Email,
                IsDeleted = FormatStringToBoolean(userDTO.IsDeleted),
                LastChange = userDTO.LastChange,
                RoleId = userDTO.RoleId
            };
        }

        /// <summary>
        /// Convert Role to RoleDTO
        /// </summary>
        /// <param name="role"></param>
        /// <returns>Mapping to RoleDTO</returns>
        public static RoleDTO ToRoleDTO(Roles role)
        {
            return new RoleDTO
            {
                RoleId = role.RoleId,
                RoleName = role.RoleName
            };
        }

        /// <summary>
        /// Convert RoleDTO to Role
        /// </summary>
        /// <param name="roleDTO"></param>
        /// <returns>Mapping to Role</returns>
        public static Roles ToRole(RoleDTO roleDTO)
        {
            return new Roles
            {
                RoleId = roleDTO.RoleId,
                RoleName = roleDTO.RoleName ?? string.Empty
            };
        }

        public static CarDTO ToCarDTO(Cars car)
        {
            var carPrice = FormatPrice(car.PriceBatteryRental);

            return new CarDTO
            {
                Id = car.Id,
                Name = car.Name,
                Price = carPrice,
                Seat = car.Seats,
                Image = car.Image,
                IsShowed = car.IsShowed
            };
        }

        public static AdminCarDTO ToAdminCarDTO(Cars car)
        {
            return new AdminCarDTO
            {
                Id = car.Id,
                Model = car.Name,
                Seat = car.Seats,
                Image = car.Image,
                SpecImage = car.SpecImage,
                BannerImage = car.ImageBanner,
                PriceBatteryOwn = car.PriceBatteryOwn,
                PriceBatteryRental = car.PriceBatteryRental,
                PriceDeposite = car.PriceDeposite,
                Quantity = car.Quantity,
                IsDeleted = car.IsDeleted,
                IsShowed = car.IsShowed
            };
        }

        public static CarDetailDTO ToCarDetailDTO(Cars car)
        {
            var carPrice = FormatPrice(car.PriceBatteryRental);
            var carPriceOwn = FormatPrice(car.PriceBatteryOwn);
            var carDeposite = FormatPrice(car.PriceDeposite);

            return new CarDetailDTO
            {
                Id = car.Id,
                Name = car.Name,
                PriceBatteryRental = carPrice,
                PriceBatteryOwn = carPriceOwn,
                PriceDeposite = carDeposite,
                SpecImage = car.SpecImage,
                ImageBanner = car.ImageBanner
            };
        }

        public static List<CarDTO> ToCarDTOList(List<Cars> cars)
        {
            return cars.Select(car => ToCarDTO(car)).ToList();
        }

        public static List<AdminCarDTO> ToAdminCarDTOList(List<Cars> cars)
        {
            return cars.Select(car => ToAdminCarDTO(car)).ToList();
        }

        private static string FormatPrice(double price)
        {
            return price.ToString("N0", new CultureInfo("en-US")).Replace(",", ".");
        }

        // Mapping car color of User
        public static CarColorDTO ToCarColorDTO(CarColor carColor)
        {
            return new CarColorDTO
            {
                Id = carColor.ColorId,
                ColorName = carColor.ColorName,
                ColorImage = carColor.ColorImage
            };
        }
        // Mapping  list car colors of User
        public static List<CarColorDTO> ToCarColorDTOList(List<CarColor> carColors)
        {
            return carColors.Select(carColor => ToCarColorDTO(carColor)).ToList();
        }

        // Mapping car color of Admin
        public static AdminCarColorDTO ToAdminCarColorDTO(CarColor carColor)
        {
            return new AdminCarColorDTO
            {
                ColorId = carColor.ColorId,
                ColorName = carColor.ColorName,
                ColorImage = carColor.ColorImage,
                IsDeleted = carColor.IsDeleted,
                CarId = carColor.CarId
            };
        }

        // Mapping list car colors of Admin
        public static List<AdminCarColorDTO> ToAdminCarColorDTOList(List<CarColor> carColors)
        {
            return carColors.Select(carColor => ToAdminCarColorDTO(carColor)).ToList();
        }

        public static CategoryDTO ToCategoryDTO(Category category)
        {
            return new CategoryDTO
            {
                Id = category.Id,
                Name = category.Name,
                ParentsId = category.ParentsId
            };
        }

        public static List<CategoryDTO> ToCategoryDTOList(List<Category> categories)
        {
            return categories.Select(category => ToCategoryDTO(category)).ToList();
        }

        public static AccessoryDTO ToAccessoryDTO(Accessory accessory)
        {
            return new AccessoryDTO
            {
                Id = accessory.Id,
                Name = accessory.Name,
                Image = accessory.Image,
                Price = accessory.Price,
                Quantity = accessory.Quantity,
                Description = accessory.Description,
                IsDeleted = accessory.IsDeleted,
                IsShowed = accessory.IsShowed,
                CategoryId = accessory.CategoryId,
                Origin = accessory.Origin,
                Dimensions = accessory.Dimensions,
                Weight = accessory.Weight,
                Material = accessory.Material,
                Color = accessory.Color,
                Warranty = accessory.Warranty
            };
        }

        public static List<AccessoryDTO> ToAccessoryDTOList(List<Accessory> accessories)
        {
            return accessories.Select(accessory => ToAccessoryDTO(accessory)).ToList();
        }

        public static TestDriveRegistration ToTestDriveRegistration(TestDriveRegistrationDTO testDriveDTO)
        {
            return new TestDriveRegistration
            {
                FullName = testDriveDTO.FullName,
                Phone = testDriveDTO.Phone,
                Email = testDriveDTO.Email,
                CarId = testDriveDTO.CarId,
                Description = testDriveDTO.Description
            };
        }

        public static AccessoryImageDTO ToAccessoryImageDTO(AccessoryImage accessoryImage)
        {
            return new AccessoryImageDTO
            {
                Id = accessoryImage.ColorId,
                ColorName = accessoryImage.ColorName,
                ColorImage = accessoryImage.ColorImage
            };
        }

        public static List<AccessoryImageDTO> ToAccessoryImageDTOList(List<AccessoryImage> accessoryImage)
        {
            return accessoryImage.Select(image => ToAccessoryImageDTO(image)).ToList();
        }

        public static CartItemDTO ToCartItemDTO(CartItem cartItem)
        {
            return new CartItemDTO
            {
                Id = cartItem.Id,
                ProductId = cartItem.ProductId,
                ProductName = cartItem.ProductName,
                Price = cartItem.Price,
                Quantity = cartItem.Quantity,
                ImageUrl = cartItem.ImageUrl,
                TotalPrice = cartItem.Price * cartItem.Quantity,
                UserId = cartItem.UserId
            };
        }

        public static List<CartItemDTO> ToCartItemDTOList(List<CartItem> cartItems)
        {
            return cartItems.Select(cartItem => ToCartItemDTO(cartItem)).ToList();
        }

        public static List<UserDTO> ToUserDTOList(List<Users> users)
        {
            return users.Select(user => ToUserDTO(user)).ToList();
        }

        private static string FormatFullname(string fullname)
        {
            if (string.IsNullOrWhiteSpace(fullname))
            {
                return fullname;
            }

            var words = fullname.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            for (int i = 0; i < words.Length; i++)
            {
                if (words[i].Length > 0)
                {
                    words[i] = char.ToUpper(words[i][0]) + words[i].Substring(1).ToLower();
                }
            }

            return string.Join(' ', words);
        }

        private static string FormatBooleanToString(bool isDeleted)
        {
            return isDeleted ? "True" : "False";
        }
        private static bool FormatStringToBoolean(string isDeleted)
        {
            if (isDeleted == "True")
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        private static string FormatDateTime(DateTime dateTime)
        {
            return dateTime.ToString("dd-MM-yyyy HH:mm");
        }

        public static CartItem ToCartItem(CartItemDTO cartItemDTO)
        {
            return new CartItem
            {
                ProductId = cartItemDTO.ProductId,
                ProductName = cartItemDTO.ProductName,
                Price = cartItemDTO.Price,
                Quantity = cartItemDTO.Quantity,
                ImageUrl = cartItemDTO.ImageUrl,
                UserId = cartItemDTO.UserId
            };
        }

        
    }
}