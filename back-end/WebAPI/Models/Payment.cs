using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    [Table("Payment")]
    public class Payment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("Payment ID")]
        public int Id { get; set; }

        [Required]
        public string? InvoiceId { get; set; } // Foreign Key

        [Required]
        [Column("Amount Paid")]
        public double AmountPaid { get; set; }

        [Required]
        [Column("Payment Date")]
        public DateTime PaymentDate { get; set; } = DateTime.UtcNow;

        [Required]
        [StringLength(50)]
        [Column("Payment Method")]
        public string? PaymentMethod { get; set; }  // "Credit Card", "Bank Transfer", "VNPay"

        // VNPay Information
        [Required]
        [StringLength(50)]
        [Column("VNPay Transaction ID")]
        public string? VNPayTransactionId { get; set; } // VNPay Transaction ID

        [StringLength(10)]
        [Column("VNPay Response Code")]
        public string? VNPayResponseCode { get; set; }  // VNPay Response Code

        [StringLength(255)]
        [Column("VNPay Order Information")]
        public string? VNPayOrderInfor { get; set; }    // VNPay Payment URL

        [Required]
        [Column("Is Success")]
        public bool IsSuccess { get; set; } = false;   // Is the transaction successful?

        // Navigation Property
        public Invoice? Invoice { get; set; }
    }
}