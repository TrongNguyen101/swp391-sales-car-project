namespace WebAPI.DTO
{
    public class DepositPaymentDTO
    {
        public Guid DepsoitPaymentId { get; set; }
        public string? Amount { get; set; }
        public string? OrderInfo { get; set; }
        public string? TransactionStatus { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CarId { get; set; }
        public Guid UserId { get; set; }
    }
}