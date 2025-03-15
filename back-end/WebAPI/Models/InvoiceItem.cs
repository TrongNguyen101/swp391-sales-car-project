using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    [Table("InvoiceItem")]
    public class InvoiceItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("Item ID")]
        public int Id { get; set; }

        [Required]
        [Column("Invoice ID")]
        public int InvoiceId { get; set; }

        [Required]
        [StringLength(150)]
        [Column("Product Name")]
        public string? ProductName { get; set; }

        [Required]
        [Column("Quantity")]
        public int Quantity { get; set; }

        [Required]
        [Column("Unit Price")]
        public double UnitPrice { get; set; }

        // Navigation Property
        public Invoice? Invoice { get; set; }

        [ForeignKey("CarId")]
        public int CarId { get; set; }

        public Cars? Car { get; set; }

        public int AccessoryId { get; set; }

        public Accessory? Accessory { get; set; }
    }
}