using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTO
{
    public class InvoiceItemDTO
    {
        public int Id { get; set; }

        public string? InvoiceId { get; set; }

        public string? ProductName { get; set; }

        public int Quantity { get; set; }

        public string? UnitPrice { get; set; }

        public string? subTotal { get; set; }
    }
}