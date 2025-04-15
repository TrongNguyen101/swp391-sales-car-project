using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    [Table("ImportExportHistory")]
    public class ImportExportHistory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string? ProductName { get; set; }

        [Required]
        [StringLength(10)]
        public string Type { get; set; } // "Import" or "Export"

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be a positive value")]
        public int Quantity { get; set; }

        [Required]
        public DateTime TransactionDate { get; set; }

        [StringLength(500)]
        public string? Note { get; set; }

        public int? AccessoryId { get; set; }

        public int? CarId { get; set; }

        public Accessory? Accessory { get; set; } // Navigation property

        public Cars? Car { get; set; } // Navigation property
    }
}