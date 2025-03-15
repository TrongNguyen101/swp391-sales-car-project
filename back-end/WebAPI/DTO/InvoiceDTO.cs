using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTO
{
    public class InvoiceDTO
    {
        [Required]
        public int Id { get; set; }

        public string? TypeOfProduct { get; set; }

        [Required]
        [StringLength(100)]
        public string CustomerName { get; set; }

        public string Email { get; set; }

        public DateTime DateCreate { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Total amount must be a positive value")]
        public decimal TotalAmount { get; set; }

        public bool IsPaid { get; set; } = false;

        [Required]
        [StringLength(20)]
        public string Status { get; set; } = "Pending"; // "Pending", "Completed", "Canceled"

    }
}