namespace WebAPI.DTO
{
    public class RequestForgotPassword
    {
        public string? Email { get; set; }
        public string? OTP { get; set; }
        public string? TemporaryPassword{ get; set; }
    }
}