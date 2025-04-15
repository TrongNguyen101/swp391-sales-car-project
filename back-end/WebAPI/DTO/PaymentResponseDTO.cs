namespace WebAPI.DTO
{
    public class PaymentResponseDTO
    {
    public double Amount { get; set; }
    public string? VNPayOrderInfor { get; set; }
    public string? VNPayResponseCode { get; set; }
    public string? VNPayTransactionNo { get; set; }

    public DateTime VNPayPayDate { get; set; }
    }
}