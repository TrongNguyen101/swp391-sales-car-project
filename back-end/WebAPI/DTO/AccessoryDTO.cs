namespace WebAPI.DTO
{
    public class AccessoryDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Image { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public string? Description { get; set; }
        public bool IsDeleted { get; set; }
        public int CategoryId { get; set; }
        public string? Origin { get; set; }
        public string? Dimensions { get; set; }
        public double? Weight { get; set; }
        public string? Material { get; set; }
        public string? Color { get; set; }
        public string? Warranty { get; set; }
    }
}