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
                UserName = user.UserName,
                Address = user.Address,
                Phone = user.Phone,
                Email = user.Email,
                CreatedAt = user.CreatedAt,
                IsDeleted = user.IsDeleted,
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
                CreatedAt = userDTO.CreatedAt,
                IsDeleted = userDTO.IsDeleted,
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
                Image = car.Image
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

        private static string FormatPrice(double price)
        {
            return price.ToString("N0", new CultureInfo("en-US")).Replace(",", ".");
        }

        public static CarColorDTO ToCarColorDTO(CarColor carColor)
        {
            return new CarColorDTO
            {
                Id = carColor.ColorId,
                ColorName = carColor.ColorName,
                ColorImage = carColor.ColorImage
            };
        }
        public static List<CarColorDTO> ToCarColorDTOList(List<CarColor> carColors)
        {
            return carColors.Select(carColor => ToCarColorDTO(carColor)).ToList();
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