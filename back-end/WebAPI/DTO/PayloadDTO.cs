namespace WebAPI.DTO
{
    public class PayloadDTO
    {
        public string? sub { get; set; }
        public string? name { get; set; }
        public string? email { get; set; }
        public string? role { get; set; }
        public string? iss { get; set; }
        public string? aud { get; set; }
        public long exp { get; set; }
    }
}