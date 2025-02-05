// filepath: /Users/nguyentrong/swp391-sales-car-project/back-end/WebAPI/Services/MappingService.cs
using System.Globalization;
using WebAPI.DTO;
using WebAPI.Models;

namespace WebAPI.Utils.AutoMapper
{
    public static class AutoMapper
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
                ColorImage1 = car.ColorImage1,
                ColorImage2 = car.ColorImage2,
                ColorImage3 = car.ColorImage3,
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
    }
}