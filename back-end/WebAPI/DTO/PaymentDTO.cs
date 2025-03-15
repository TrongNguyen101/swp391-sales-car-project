using System;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTO
{
    public class PaymentDTO
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int InvoiceId { get; set; } // Foreign Key

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Amount paid must be a positive value")]
        public double AmountPaid { get; set; }

        [Required]
        public DateTime PaymentDate { get; set; } = DateTime.UtcNow;

        [StringLength(50)]
        public string? PaymentMethod { get; set; }  // "Credit Card", "Bank Transfer", "VNPay"

        // VNPay Information
        [StringLength(50)]
        public string? VNPayTransactionId { get; set; } // VNPay Transaction ID

        [StringLength(10)]
        public string? VNPayResponseCode { get; set; }  // VNPay Response Code

        [StringLength(255)]
        public string? VNPayPaymentUrl { get; set; }    // VNPay Payment URL

        public bool IsSuccess { get; set; } = false;   // Is the transaction successful?
    }
}