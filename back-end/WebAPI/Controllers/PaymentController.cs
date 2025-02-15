using Microsoft.AspNetCore.Mvc;
using WebAPI.DTO;
using WebAPI.Utils.JwtTokenHelper;
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
            try
            {

                var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
                var token = authorizationHeader.Split(" ")[1];
                bool isAuthorized = JwtTokenHelper.VerifyJwtToken(token);
                var role = JwtTokenHelper.GetUserRole(token);
                if (!isAuthorized)
                {
                    return Unauthorized(new DataResponse
                    {
                        StatusCode = 401,
                        Success = false,
                        Message = "Unauthorized token is invalid",
                    });
                }
                if (role.ToString() != "2")
                {
                    return Unauthorized(new DataResponse
                    {
                        StatusCode = 401,
                        Success = false,
                        Message = "Unauthorized access denied",
                        Data = isAuthorized + "+" + role,
                    });
                }
                var paymentUrl = vnpayPayment.CreatePaymentUrl(depositInfo);
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Success = true,
                    Data = paymentUrl,
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new DataResponse
                {
                    StatusCode = 400,
                    Success = false,
                    Message = ex.Message,
                });
            }
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