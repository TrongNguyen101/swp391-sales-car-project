namespace WebAPI.DTO
{
    public class CarDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Price { get; set; }
        public int Seat { get; set; }
        public string? Image { get; set; }
        public bool IsShowed { get; set; }
    }
}