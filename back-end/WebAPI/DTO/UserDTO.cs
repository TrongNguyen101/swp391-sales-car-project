namespace WebAPI.DTO
{
    public class UserDTO
    {
        public Guid UserId { get; set; }
        public string? UserName { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? CreatedAt { get; set; }
        public string? IsDeleted { get; set; }
        public DateTime LastChange { get; set; }
        public int RoleId { get; set; }
    }
}