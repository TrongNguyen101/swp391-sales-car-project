using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTO
{
    public class ChangePasswordRequestDTO
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? RePassword { get; set; }
        public string? OTP { get; set; }
    }
}