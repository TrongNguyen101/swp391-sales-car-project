using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    [Table("Cars")]
    public class Cars
    {
        [Key]
        [Column("Car ID")]
        public int Id { get; set; }
        [Column("Car Name")]
        public string? Name { get; set; }
        [Column("Seats")]
        public int Seats { get; set; }
        [Column("Image")]
        public string? Image { get; set; }
        [Column("Spec Image")]
        public string? SpecImage { get; set; }
        [Column("Color Image 1")]
        public string? ColorImage1 { get; set; }
        [Column("Color Image 2")]
        public string? ColorImage2 { get; set; }
        [Column("Color Image 3")]
        public string? ColorImage3 { get; set; }
        [Column("Color Image 4")]
        public string? ColorImage4 { get; set; }
        [Column("Color Image 5")]
        public string? ColorImage5 { get; set; }
        [Column("Image Banner")]
        public string? ImageBanner { get; set; }
        [Column("Price Battery Rental")]
        public double PriceBatteryRental { get; set; }
        [Column("Price Battery Own")]
        public double PriceBatteryOwn { get; set; }
        [Column("Price Deposite")]
        public double PriceDeposite { get; set; }
    }
}