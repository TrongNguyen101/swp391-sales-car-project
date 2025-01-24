// filepath: /Users/nguyentrong/swp391-sales-car-project/back-end/WebAPI/Services/MappingService.cs
using WebAPI.DTO;
using WebAPI.Models;

namespace WebAPI.Utils.AutoMapper
{
    public static class AutoMapper
    {
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

        public static RoleDTO ToRoleDTO(Roles role)
        {
            return new RoleDTO
            {
                RoleId = role.RoleId,
                RoleName = role.RoleName
            };
        }

        public static Roles ToRole(RoleDTO roleDTO)
        {
            return new Roles
            {
                RoleId = roleDTO.RoleId,
                RoleName = roleDTO.RoleName ?? string.Empty
            };
        }
    }
}