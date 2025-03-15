using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    [Table("Cars")]
    public class Cars
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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
        [Column("Image Banner")]
        public string? ImageBanner { get; set; }
        [Column("Price Battery Rental")]
        public double PriceBatteryRental { get; set; }
        [Column("Price Battery Own")]
        public double PriceBatteryOwn { get; set; }
        [Column("Price Deposite")]
        public double PriceDeposite { get; set; }
        [Column("Quantity")]
        public int Quantity { get; set; }
        [Column("Is Deleted")]
        public bool IsDeleted { get; set; }
        [Column("Is Show")]
        public bool IsShowed { get; set; }
        public ICollection<CarColor>? CarColors { get; set; } = new List<CarColor>();
        public ICollection<CarDeposit>? CarDeposits { get; set; } = new List<CarDeposit>();
        public ICollection<InvoiceItem>? InvoiceItems { get; set; } = new List<InvoiceItem>();
    }
}