namespace CarDetailDTO
{
    public class CarDetailDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int Seats { get; set; }
        public string? SpecImage { get; set; }
        public string? ColorImageDetail1 { get; set; }
        public string? ColorImageDetail2 { get; set; }
        public string? ColorImageDetail3 { get; set; }
        public string? ColorImage1 { get; set; }
        public string? ColorImage2 { get; set; }
        public string? ColorImage3 { get; set; }
        public string? ImageBanner { get; set; }
        public double PriceBatteryRental { get; set; }
        public double PriceBatteryOwn { get; set; }
        public double PriceDeposite { get; set; }
    }
}