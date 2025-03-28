using Microsoft.AspNetCore.Mvc;
using WebAPI.DAO;
using WebAPI.DTO;
using WebAPI.Models;
using WebAPI.Utils.AutoMapper;
using WebAPI.Utils.JwtTokenHelper;
using WebAPI.Utils.ResponseHelper;
using WebAPI.Utils.VnpayPayment;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminTransactionsController : ControllerBase
    {

        private readonly VnpayPayment vnpayPayment;


        public AdminTransactionsController(IConfiguration configuration)
        {
            vnpayPayment = new VnpayPayment(configuration);
        }

        [HttpGet("getAllDepositTransactions")]
        public async Task<ActionResult> GetAllDepositTransactions()
        {
            try
            {
                var invoices = await TransactionsDAO.GetInstance().GetAllDepositTransactions();
                if (!invoices.Any())
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "No deposit transactions found",
                        Success = false
                    });
                }
                var invoiceDTOs = AutoMapper.ToInvoiceDTOList(invoices);

                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Message = "Successfully retrieved all deposit transactions.",
                    Success = true,
                    Data = invoiceDTOs
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new DataResponse
                {
                    StatusCode = 400,
                    Message = ex.Message,
                    Success = false
                });
            }
        }


        [HttpGet("getAllTransactions")]
        public async Task<ActionResult> GetAllTransactions()
        {
            try
            {
                #region Authentication, Authorization
                // Check authentication and authorization of user based on the specified HTTP context and role that need to check for this function
                // If the user is not authenticated or authorized, return error message
                // If the user is authenticated and authorized, return claims of user
                // admin role id = 1
                // customer role id = 2
                var (isSuccess, errorMessage, claims) = JwtTokenHelper.AuthenticateAndAuthorize(HttpContext, 2);
                if (!isSuccess)
                {
                    return Unauthorized(ResponseHelper.ResponseError(401, errorMessage, false, null));
                }
                #endregion
                claims.TryGetValue("sub", out var userId);
                var invoices = await TransactionsDAO.GetInstance().GetAllTransactions(userId.ToString());
                if (!invoices.Any())
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "No deposit transactions found",
                        Success = false
                    });
                }
                var invoiceDTOs = AutoMapper.ToInvoiceDTOList(invoices);

                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Message = "Successfully retrieved all deposit transactions.",
                    Success = true,
                    Data = invoiceDTOs
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new DataResponse
                {
                    StatusCode = 400,
                    Message = ex.Message,
                    Success = false
                });
            }
        }

        [HttpGet("getAllAccessoryTransactions")]
        public async Task<ActionResult> GetAllDepositAccessoryTransactions()
        {
            try
            {
                var invoices = await TransactionsDAO.GetInstance().GetAllAccessoryTransactions();
                if (!invoices.Any())
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "No accessory transaction found",
                        Success = false
                    });
                }
                var invoiceDTOs = AutoMapper.ToInvoiceDTOList(invoices);

                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Message = "Successfully retrieved all accessoryies transactions.",
                    Success = true,
                    Data = invoiceDTOs
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new DataResponse
                {
                    StatusCode = 400,
                    Message = ex.Message,
                    Success = false
                });
            }
        }

        [HttpGet("getTransactionById/{id}")]
        public async Task<ActionResult> GetTransactionById(string id)
        {
            try
            {
                var invoice = await TransactionsDAO.GetInstance().GetInvoiceById(id);
                if (invoice == null)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "Transaction not found",
                        Success = false
                    });
                }
                var invoiceDTO = AutoMapper.ToInvoiceDTO(invoice);

                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Message = "Successfully retrieved transaction.",
                    Success = true,
                    Data = invoiceDTO
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new DataResponse
                {
                    StatusCode = 400,
                    Message = ex.Message,
                    Success = false
                });
            }
        }

        [HttpGet("getInvoiceItemByInvoiceId/{id}")]
        public async Task<ActionResult> GetInvoiceItemByInvoiceId(string id)
        {
            try
            {
                var invoiceItemList = await TransactionsDAO.GetInstance().GetInvoiceItemsByInvoiceId(id);
                if (invoiceItemList == null || !invoiceItemList.Any())
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "Transaction not found",
                        Success = false
                    });
                }
                var invoiceItemDTOs = AutoMapper.ToInvoiceItemDTOList(invoiceItemList);

                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Message = "Successfully retrieved transaction.",
                    Success = true,
                    Data = invoiceItemDTOs
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new DataResponse
                {
                    StatusCode = 400,
                    Message = ex.Message,
                    Success = false
                });
            }
        }




        [HttpPost("createInvoice")]
        public async Task<IActionResult> CreateInvoice([FromBody] InvoiceDTO invoiceDTO)
        {
            try
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
                #endregion

                // Extract the user ID from the token claims
                Guid.TryParse(claims["sub"].ToString(), out Guid userId);

                // Initialize a list to store invoice items and an invoice object
                var invoiceItems = new List<InvoiceItem>();
                var invoice = new Invoice();
                string invoiceId;


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
                    invoiceId = $"{"Accessory"}-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid().ToString("N").Substring(0, 6)}";

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
                    }

                    // Set the invoice details for an accessory product type
                    invoice.Id = invoiceId;
                    invoice.TypeOfProduct = "accessory";
                    invoice.UserId = userId;
                    invoice.CustomerName = invoiceDTO.CustomerName;
                    invoice.Phone = invoiceDTO.Phone;
                    invoice.Email = invoiceDTO.Email;
                    invoice.PayDate = DateTime.UtcNow;
                    invoice.TotalAmount = totalPrice;
                    invoice.IsPaid = false;
                    invoice.Status = "Pending";
                    invoice.InvoiceInformation = "payment for accessory";

                    var depositInfo = new DepositInfo
                    {
                        Amount = AutoMapper.FormatPrice(totalPrice),
                        OrderInfo = $"{invoiceId}_{invoiceDTO.CustomerName}-{invoiceDTO.InvoiceInformation}"
                    };

                    // Attempt to save the invoice and invoice items to the database
                    if (await TransactionsDAO.GetInstance().CreateInvoiceAsync(invoice, invoiceItems))
                    {
                        //lam tiep payment tai day 
                        var paymentUrl = vnpayPayment.CreatePaymentUrl(depositInfo);

                        // If successful, return a response with the payment URL
                        return Ok(new DataResponse
                        {
                            StatusCode = 200,
                            Message = "Create invoice successfully fordwad to payment",
                            Success = true,
                            Data = paymentUrl
                        });
                    }
                    else
                    {
                        // If creation fails, return a failure response
                        return BadRequest(new DataResponse
                        {
                            StatusCode = 400,
                            Message = "Create invoice failed, please try again",
                            Success = false
                        });
                    }
                }
                else
                {
                    // Retrieve car information if the product type is not "accessory"
                    var car = await CarsDAO.GetInstance().GetCarByName(invoiceDTO.TypeOfProduct);
                    if (car == null)
                    {
                        return NotFound(ResponseHelper.Response(404, "Car not found", false, null));
                    }
                    var carDTO = AutoMapper.ToCarDetailDTO(car);
                    Console.WriteLine(car);

                    // Generate a unique invoice ID using the product type, timestamp, and GUID
                    invoiceId = $"{"CarDeposit"}-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid().ToString("N").Substring(0, 6)}";

                    // Add the car as an invoice item
                    invoiceItems.Add(new InvoiceItem
                    {
                        InvoiceId = invoiceId,
                        ProductName = invoiceDTO.TypeOfProduct,
                        Quantity = 1,
                        UnitPrice = AutoMapper.ParsePrice(invoiceDTO.TotalAmount),
                        CarId = carDTO.Id,
                    });

                    // Set the invoice details for a car product type
                    invoice.Id = invoiceId;
                    invoice.TypeOfProduct = "carDeposit";
                    invoice.UserId = userId;
                    invoice.CustomerName = invoiceDTO.CustomerName;
                    invoice.Phone = invoiceDTO.Phone;
                    invoice.Email = invoiceDTO.Email;
                    invoice.PayDate = DateTime.UtcNow;
                    invoice.TotalAmount = AutoMapper.ParsePrice(invoiceDTO.TotalAmount);
                    invoice.IsPaid = false;
                    invoice.Status = "Pending";
                    invoice.InvoiceInformation = invoiceDTO.InvoiceInformation;

                    var depositInfo = new DepositInfo
                    {
                        Amount = invoiceDTO.TotalAmount,
                        OrderInfo = $"{invoiceId}_{invoiceDTO.CustomerName}-{invoiceDTO.InvoiceInformation}"
                    };

                    // Attempt to save the invoice and invoice items to the database
                    if (await TransactionsDAO.GetInstance().CreateInvoiceAsync(invoice, invoiceItems))
                    {
                        var paymentUrl = vnpayPayment.CreatePaymentUrl(depositInfo);

                        // If successful, return a response with the payment URL
                        return Ok(new DataResponse
                        {
                            StatusCode = 200,
                            Message = "Create invoice successfully fordwad to payment",
                            Success = true,
                            Data = paymentUrl
                        });
                    }
                    else
                    {
                        // If creation fails, return a failure response
                        return BadRequest(new DataResponse
                        {
                            StatusCode = 400,
                            Message = "Create invoice failed, please try again",
                            Success = false
                        });
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle any exceptions that occur and log the error message
                Console.WriteLine(ex.Message);
                return BadRequest(new DataResponse
                {
                    StatusCode = 400,
                    Message = "Internal server error. Please contact support.",
                    Success = false
                });
            }
        }

    }
}