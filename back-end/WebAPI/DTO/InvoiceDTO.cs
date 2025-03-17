using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTO
{
    public class InvoiceDTO
    {
        public string? Id { get; set; }

        public string? TypeOfProduct { get; set; }

        [StringLength(100)]
        public string? CustomerName { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }

        public DateTime DateCreate { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Total amount must be a positive value")]
        public decimal TotalAmount { get; set; }

        public bool IsPaid { get; set; } = false;

        [StringLength(20)]
        public string Status { get; set; } = "Pending"; // "Pending", "Completed", "Canceled"

    }
}