using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    [Table("DepositPayment")]
    public class DepositPayment
    {
        [Key]
        [Column("Deposit Payment ID")]
        public Guid DepsoitPaymentId { get; set; }
        [Column("Amount")]
        public string? Amount { get; set; }
        [Column("Order Info")]
        public string? OrderInfo { get; set; }
        [Column("Transaction Status")]
        public string? TransactionStatus { get; set; }
        [Column("Created At")]
        public DateTime CreatedAt { get; set; }
        [Column("Car ID")]
        public int CarId { get; set; }
        [Column("User ID")]
        public Guid UserId { get; set; }
    }
}