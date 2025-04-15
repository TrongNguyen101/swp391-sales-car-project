using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTO
{
    public class AdminCarDTO
    {
        public int Id { get; set; }

        [StringLength(100)]
        public string? Model { get; set; }

        [Required]
        [Range(4, 9, ErrorMessage = "Seat must be between 4 and 9")]
        public int Seat { get; set; }

        [StringLength(50)]
        public string? Image { get; set; }

        [StringLength(50)]
        public string? SpecImage { get; set; }

        [StringLength(50)]
        public string? BannerImage { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be a positive value")]
        public double PriceBatteryOwn { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be a positive value")]
        public double PriceBatteryRental { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be a positive value")]
        public double PriceDeposite { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1")]
        public int Quantity { get; set; }

        public bool IsDeleted { get; set; }
        public bool IsShowed { get; set; }
    }
}