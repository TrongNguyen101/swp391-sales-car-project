using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTO
{
    public class InvoiceItemDTO
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int InvoiceId { get; set; }

        [Required]
        [StringLength(150)]
        public string? ProductName { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Unit price must be a positive value")]
        public double UnitPrice { get; set; }
    }
}