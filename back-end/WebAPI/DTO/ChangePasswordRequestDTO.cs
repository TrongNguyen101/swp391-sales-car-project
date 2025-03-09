using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTO
{
    public class ChangePasswordRequestDTO
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
        [Required]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters.")]
        public string? Password { get; set; }
        [Required]
        [MinLength(8, ErrorMessage = "Repassword must be at least 8 characters.")]
        public string? rePassword { get; set; }

        [Required]
        public string? OTP { get; set; }
    }
}