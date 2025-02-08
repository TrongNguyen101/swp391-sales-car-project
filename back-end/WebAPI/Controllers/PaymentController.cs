using Microsoft.AspNetCore.Mvc;
using WebAPI.DTO;
using WebAPI.Utils.VnpayPayment;

namespace WebAPI.Controllers
{
    public class PaymentController : ControllerBase
    {
        private readonly VnpayPayment vnpayPayment;

        public PaymentController(IConfiguration configuration)
        {
            vnpayPayment = new VnpayPayment(configuration);
        }

        [HttpPost("CreatePaymentUrl")]
        public async Task<IActionResult> CreatePayment(double amount, string orderInfo)
        {
            var paymentUrl = vnpayPayment.CreatePaymentUrl(amount, orderInfo);
            return Ok(new DataResponse
            {
                StatusCode = 200,
                Success = true,
                Data = paymentUrl,
            });
        }

        [HttpGet("PaymentResponse")]
        public async Task<IActionResult> ProcessPaymentResponse([FromBody] HttpRequestMessage request)
        {
            var paymentResponse = await vnpayPayment.ProcessPaymentResponse(request);
            if (paymentResponse == null && paymentResponse.TransactionStatus != "00")
            {
                return BadRequest(new DataResponse
                {
                    StatusCode = 400,
                    Success = false,
                    Message = "Payment failed",
                });
            }
            return Ok(new DataResponse
            {
                StatusCode = 200,
                Success = true,
                Data = paymentResponse,
            });
        }
    }
}