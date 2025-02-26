namespace WebAPI.DTO
{
    public class AccessoryDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Image { get; set; }
        public double Price { get; set; }
        public int CategoryId { get; set; }
    }
}