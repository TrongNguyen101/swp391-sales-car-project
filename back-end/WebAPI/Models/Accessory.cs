using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    [Table("Accessory")]
    public class Accessory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("Accessory ID")]
        public int Id { get; set; }

        [Column("Accessory Name")]
        [Required]
        [StringLength(255)]
        public string? Name { get; set; }

        [Column("Accessory Image")]
        [StringLength(255)]
        public string? Image { get; set; }

        [Column("Accessory Price")]
        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be a positive value")]
        public double Price { get; set; }

        [Column("Quantity")]
        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Quantity must be a positive value")]
        public int Quantity { get; set; }

        [Column("Description")]
        [StringLength(5000)]
        [Required]
        public string? Description { get; set; }

        [Column("Is Deleted")]
        [Required]
        public bool IsDeleted { get; set; }

        [Column("Is Showed")]
        [Required]
        public bool IsShowed { get; set; }

        [Column("Category ID")]
        [Required]
        public int CategoryId { get; set; }

        [Column("Origin")]
        [StringLength(255)]
        public string? Origin { get; set; }

        [Column("Dimensions")]
        [StringLength(255)]
        public string? Dimensions { get; set; }

        [Column("Weight")]
        [Range(0, double.MaxValue, ErrorMessage = "Weight must be a positive value")]
        public double? Weight { get; set; }

        [Column("Material")]
        [StringLength(255)]
        public string? Material { get; set; }

        [Column("Color")]
        [StringLength(255)]
        public string? Color { get; set; }

        [Column("Warranty")]
        [StringLength(255)]
        public string? Warranty { get; set; }

        public Category? Category { get; set; }
        public ICollection<AccessoryImage>? AccessoryImages { get; set; } = new List<AccessoryImage>();
        public ICollection<CartItem>? CartItems { get; set; } = new List<CartItem>();
        public ICollection<InvoiceItem>? InvoiceItems { get; set; } = new List<InvoiceItem>();
    }
}