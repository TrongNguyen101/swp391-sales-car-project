using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    [Table("Invoice")]
    public class Invoice
    {
        [Key]
        [Column("Invoice ID")]
        public string? Id { get; set; }

        [Required]
        [StringLength(100)]
        [Column("Type of Product")]
        public string? TypeOfProduct { get; set; }

        [Required]
        [Column("User ID")]
        public Guid UserId { get; set; }

        [Required]
        [StringLength(100)]
        [Column("Customer Name")]
        public string? CustomerName { get; set; }

        [Required]
        [StringLength(100)]
        [Column("Phone")]
        public string? Phone { get; set; }

        [Required]
        [EmailAddress]
        [Column("Email")]
        public string? Email { get; set; }

        [Column("Date Create")]
        public DateTime DateCreate { get; set; }

        [Required]
        [Column("Total Amount")]
        public double TotalAmount { get; set; }

        [Column("Is Paid")]
        public bool IsPaid { get; set; } = false;

        [Required]
        [StringLength(20)]
        [Column("Status")]
        public string Status { get; set; } = "Pending"; // "Pending", "Completed", "Canceled"

        // Navigation Properties
        public Users? User { get; set; }
        public List<Payment> Payments { get; set; } = new List<Payment>();
        public List<InvoiceItem> InvoiceItems { get; set; } = new List<InvoiceItem>();


    }
}