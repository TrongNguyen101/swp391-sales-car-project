using Microsoft.AspNetCore.Mvc;
using WebAPI.DTO;
using WebAPI.Utils.VnpayPayment;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly VnpayPayment vnpayPayment;

        public PaymentController(IConfiguration configuration)
        {
            vnpayPayment = new VnpayPayment(configuration);
        }

        [HttpPost("CreatePaymentUrl")]
        public IActionResult CreatePayment([FromBody] DepositInfo depositInfo)
        {
            var paymentUrl = vnpayPayment.CreatePaymentUrl(depositInfo.Amount, depositInfo.OrderInfo);
            return Ok(new DataResponse
            {
                StatusCode = 200,
                Success = true,
                Data = paymentUrl,
            });
        }

        [HttpGet("PaymentResponse")]
        public async Task<IActionResult> ProcessPaymentResponse()
        {
            var queryParams = HttpContext.Request.Query;
            var vnp_SecureHash = queryParams["vnp_SecureHash"];
            var sortedQueryParams = queryParams
                .Where(q => q.Key != "vnp_SecureHash")
                .OrderBy(q => q.Key)
                .ToDictionary(q => q.Key, q => q.Value.ToString());
            var paymentResponse = new PaymentResponse
            {
                Amount = double.Parse(queryParams["vnp_Amount"]) / 100,
                OrderInfo = queryParams["vnp_OrderInfo"],
                TransactionStatus = queryParams["vnp_TransactionStatus"]
            };

            if (paymentResponse.TransactionStatus == "00")
            {
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Success = true,
                    Message = "Payment successful",
                    Data = paymentResponse,
                });
            }
            else
            {
                return BadRequest(new DataResponse
                {
                    StatusCode = 400,
                    Success = false,
                    Message = "Payment failed",
                });
            }
        }
    }
}