using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DAO;
using WebAPI.DTO;
using WebAPI.Utils.JwtTokenHelper;
using WebAPI.Utils.VnpayPayment;
using System.Globalization;
using WebAPI.Models;
using Microsoft.Extensions.Primitives;
using NetTopologySuite.IO;
using WebAPI.Utils.ResponseHelper;
using WebAPI.Utils.AutoMapper;

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

        #region Create invoice base on payment response from VNPay
        [HttpPost("createInvoice")]
        public async Task<IActionResult> CreateInvoice([FromBody] InvoiceDTO invoiceDTO)
        {
            #region Authentication, Authorization
            // Retrieve the authorization token from the request headers
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            // Check if the token is present and valid
            if (authorizationHeader == null || !authorizationHeader.StartsWith("Bearer "))
            {
                return Unauthorized(ResponseHelper.Response(401, "Authentication token is missing or invalid", false, null));
            }
            // Extract the token from the header
            var token = authorizationHeader.Split(" ")[1];
            // Get the claims from the token
            var claims = JwtTokenHelper.GetUserClaims(token);
            // Verify the claims (i.e., validate the token)
            if (claims == null)
            {
                return Unauthorized(ResponseHelper.Response(401, "Authentication token is invalid", false, null));
            }
            // Check user role (only allow role '2' to proceed)
            if (claims.TryGetValue("role", out var roleId) && roleId.ToString() != "2")
            {
                return Unauthorized(ResponseHelper.Response(401, "Unauthorized access denied", false, null));
            }

            Guid.TryParse(claims["sub"].ToString(), out Guid userId);
            #endregion

            var queryParams = HttpContext.Request.Query;
            var vnp_SecureHash = queryParams["vnp_SecureHash"];
            var sortedQueryParams = queryParams
                .Where(q => q.Key != "vnp_SecureHash")
                .OrderBy(q => q.Key)
                .ToDictionary(q => q.Key, q => q.Value.ToString());
            var paymentResponseDTO = new PaymentResponseDTO
            {
                Amount = double.Parse(queryParams["vnp_Amount"]) / 100,
                VNPayOrderInfor = queryParams["vnp_OrderInfo"],
                VNPayTransactionNo = queryParams["vnp_TransactionNo"],
                VNPayResponseCode = queryParams["vnp_ResponseCode"],
                VNPayPayDate = ConvertStringValuesToDateTime(queryParams["vnp_PayDate"]),

            };

            if ( await InvoicesDAO.GetInstance().GetInvoiceByVNPayTranscationNo(paymentResponseDTO.VNPayTransactionNo) != null)
            {
                return BadRequest(new DataResponse
                {
                    StatusCode = 400,
                    Success = false,
                    Message = "The invoice has already been paid",
                });
            }

            var invoiceItems = new List<InvoiceItem>();

            // check status payment before create invoice
            // if payment success, create invoice
            if (paymentResponseDTO.VNPayResponseCode == "00")
            {
                // Check if the product type is "accessory" and process the cart items
                if (invoiceDTO.TypeOfProduct == "accessory")
                {
                    // Retrieve all cart items for the user
                    var carts = await CartDAO.GetInstance().GetAllCartItemsByIdUser(userId);
                    // If no cart items are found, return a 404 Not Found response
                    if (carts.Count == 0)
                    {
                        return NotFound(ResponseHelper.Response(404, "No cart item found", false, null));
                    }
                    // Calculate the total price of all items in the cart
                    var totalPrice = 0.0;
                    totalPrice = carts.Sum(item => item.Price * item.Quantity);

                    // Generate a unique invoice ID using the product type, timestamp, and GUID
                    var invoiceId = $"{"Accessory"}-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid().ToString("N").Substring(0, 6)}";

                    // Add each cart item to the invoice items list
                    foreach (var cartItem in carts)
                    {
                        invoiceItems.Add(new InvoiceItem
                        {
                            InvoiceId = invoiceId,
                            ProductName = cartItem.ProductName,
                            Quantity = cartItem.Quantity,
                            UnitPrice = cartItem.Price,
                            AccessoryId = cartItem.ProductId
                        });
                        await CartDAO.GetInstance().DeleteCartItem(cartItem);
                    }

                    // Set the invoice details for an accessory
                    var invoice = new Invoice
                    {
                        Id = invoiceId,
                        TypeOfProduct = "accessory",
                        UserId = userId,
                        CustomerName = invoiceDTO.CustomerName,
                        Phone = invoiceDTO.Phone,
                        Email = invoiceDTO.Email,
                        Address = invoiceDTO.Address,
                        PayDate = paymentResponseDTO.VNPayPayDate,
                        TotalAmount = totalPrice,
                        IsPaid = true,
                        Status = "completed",
                        InvoiceInformation = paymentResponseDTO.VNPayOrderInfor,
                        VNPTransactionNo = paymentResponseDTO.VNPayTransactionNo
                    };

                    var invoiceAccessory = AutoMapper.ToInvoiceDTO(invoice);

                    // Attempt to save the invoice and invoice items to the database
                    if (await InvoicesDAO.GetInstance().CreateInvoiceAsync(invoice, invoiceItems))
                    {
                        //lam tiep payment tai day 

                        // If successful, return a response with the payment URL
                        return Ok(new DataResponse
                        {
                            StatusCode = 200,
                            Message = "Create invoice for accessory successfully fordwad to invoice detail",
                            Success = true,
                            Data = invoiceAccessory
                        });
                    }
                    else
                    {
                        // If creation fails, return a failure response
                        return BadRequest(new DataResponse
                        {
                            StatusCode = 400,
                            Message = "Create invoice for accessory failed, please try again",
                            Success = false
                        });
                    }
                }
                else
                {
                    // Retrieve car information if the product type is not "accessory"
                    var car = await CarsDAO.GetInstance().GetCarById(int.Parse(invoiceDTO.TypeOfProduct));
                    if (car == null)
                    {
                        return NotFound(ResponseHelper.Response(404, "Car not found", false, null));
                    }
                    var carDTO = AutoMapper.ToCarDetailDTO(car);

                    // Generate a unique invoice ID using the product type, timestamp, and GUID
                    var invoiceId = $"{"CarDeposit"}-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid().ToString("N").Substring(0, 6)}";

                    // Add the car as an invoice item
                    invoiceItems.Add(new InvoiceItem
                    {
                        InvoiceId = invoiceId,
                        ProductName = carDTO.Name,
                        Quantity = 1,
                        UnitPrice = paymentResponseDTO.Amount,
                        CarId = carDTO.Id,
                    });

                    // Set the invoice details for a car deposit
                    var invoice = new Invoice
                    {
                        Id = invoiceId,
                        TypeOfProduct = "CarDeposit",
                        UserId = userId,
                        CustomerName = invoiceDTO.CustomerName,
                        Phone = invoiceDTO.Phone,
                        Email = invoiceDTO.Email,
                        Address = invoiceDTO.Address,
                        PayDate = paymentResponseDTO.VNPayPayDate,
                        TotalAmount = paymentResponseDTO.Amount,
                        IsPaid = true,
                        Status = "completed",
                        InvoiceInformation = paymentResponseDTO.VNPayOrderInfor,
                        VNPTransactionNo = paymentResponseDTO.VNPayTransactionNo
                    };

                    var invoiceCar = AutoMapper.ToInvoiceDTO(invoice);

                    // Attempt to save the invoice and invoice items to the database
                    if (await InvoicesDAO.GetInstance().CreateInvoiceAsync(invoice, invoiceItems))
                    {
                        // If successful, return a response with the invoice details
                        return Ok(new DataResponse
                        {
                            StatusCode = 200,
                            Message = "Create invoice of car deposit successfully fordwad to payment",
                            Success = true,
                            Data = invoiceCar
                        });
                    }
                    else
                    {
                        // If creation fails, return a failure response
                        return BadRequest(new DataResponse
                        {
                            StatusCode = 400,
                            Message = "Create invoice of car deposit failed, please try again",
                            Success = false
                        });
                    }
                }
            }
            // if payment fail, return message payment fail
            else
            {
                Console.WriteLine("Transaction failed. Response code: " + paymentResponseDTO.VNPayResponseCode);
                return BadRequest(new DataResponse
                {
                    StatusCode = 400,
                    Success = false,
                    Message = "Payment failed",
                });
            }
        }
        #endregion

        [HttpGet("RemainingAmount/{carId}")]
        public async Task<IActionResult> GetRemainingBalance(int carId)
        {
            try
            {
                var car = await CarsDAO.GetInstance().GetCarById(carId);
                if (car == null)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Success = false,
                        Message = "Car not found",
                    });
                }
                var remainingAmountBatteryOwn = car.PriceBatteryOwn - car.PriceDeposite;
                var remainingAmoauntBattryRental = car.PriceBatteryRental - car.PriceDeposite;
                var FormatRemainingAmountBatteryOwn = FormatPrice(remainingAmountBatteryOwn);
                var FormatRemainingAmountBatteryRental = FormatPrice(remainingAmoauntBattryRental);
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Success = true,
                    Data = JsonSerializer.Serialize(new RemainingAmountDTO
                    {
                        remainingAmountBatteryOwn = FormatRemainingAmountBatteryOwn,
                        remainingAmountBatteryRent = FormatRemainingAmountBatteryRental,
                    }),
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

        private static string FormatPrice(double price)
        {
            return price.ToString("N0", new CultureInfo("en-US")).Replace(",", ".");
        }

        private DateTime ConvertStringValuesToDateTime(StringValues stringValues)
        {
            // Check if the StringValues is not empty or null
            if (stringValues.Count > 0)
            {
                // Extract the first string from StringValues (assuming there is only one value)
                string dateString = stringValues[0];

                // Convert the string to DateTime using the appropriate format
                DateTime dateTime;
                if (DateTime.TryParseExact(dateString, "yyyyMMddHHmmss", null, System.Globalization.DateTimeStyles.None, out dateTime))
                {
                    return dateTime; // Successfully converted
                }
                else
                {
                    throw new FormatException("Invalid date format");
                }
            }
            else
            {
                throw new ArgumentNullException("StringValues is empty");
            }
        }
    }
}