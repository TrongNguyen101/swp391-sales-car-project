namespace WebAPI.DTO
{
    public class CarDetailDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? SpecImage { get; set; }
        public string? ImageBanner { get; set; }
        public string? PriceBatteryRental { get; set; }
        public string? PriceBatteryOwn { get; set; }
        public string? PriceDeposite { get; set; }
    }
}