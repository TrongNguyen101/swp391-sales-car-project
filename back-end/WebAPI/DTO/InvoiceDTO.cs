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

        public string? Address { get; set; }

        public string? PayDate { get; set; }

        public string? TotalAmount { get; set; }

        public string? InvoiceInformation { get; set; }

        public string? VNPTransactionNo { get; set; }

        public bool IsPaid { get; set; } = false;

        [StringLength(20)]
        public string Status { get; set; } = "Pending"; // "Pending", "Completed", "Canceled"

    }
}