namespace WebAPI.DTO{
    public class TestDriveRegistrationDTO
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public int CarId { get; set; }
        public string? Description { get; set; }
    }
}
