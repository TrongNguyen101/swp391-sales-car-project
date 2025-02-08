namespace WebAPI.DTO
{
    public class PaymentResponse
    {
    public double Amount { get; set; }
    public string? OrderInfo { get; set; }
    public string? TransactionStatus { get; set; }
    }
}