namespace WebAPI.DTO
{
    public class RegisterRequest
    {
        public string UserName { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}