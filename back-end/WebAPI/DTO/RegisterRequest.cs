namespace WebAPI.DTO
{
    public class RegisterRequest
    {
        public string? Fullname { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }

        public string? RePassword { get; set; }

        public string? Phone { get; set; }

        public string? OTP { get; set; }
    }
}