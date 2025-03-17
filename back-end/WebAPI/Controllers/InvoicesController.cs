using Microsoft.AspNetCore.Mvc;
using WebAPI.DAO;
using WebAPI.DTO;
using WebAPI.Models;
using WebAPI.Utils.AutoMapper;
using WebAPI.Utils.JwtTokenHelper;
using WebAPI.Utils.ResponseHelper;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {


        public InvoicesController()
        {
        }

        [HttpPost("createInvoice")]
        public async Task<IActionResult> CreateInvoice([FromBody] InvoiceDTO invoiceDTO)
        {
            try
            {
                #region Authentication, Authorization
                // Get token
                var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

                // Check token
                if (authorizationHeader == null || !authorizationHeader.StartsWith("Bearer "))
                {
                    return Unauthorized(ResponseHelper.Response(401, "Authentication token is missing or invalid", false, null));
                }
                // Format token
                var token = authorizationHeader.Split(" ")[1];
                // Get claims
                var claims = JwtTokenHelper.GetUserClaims(token);
                // Verify token
                if (claims == null)
                {
                    return Unauthorized(ResponseHelper.Response(401, "Authentication token is invalid", false, null));
                }
                // Check role
                if (claims.TryGetValue("role", out var roleId) && roleId.ToString() != "2")
                {
                    return Unauthorized(ResponseHelper.Response(401, "Unauthorized access denied", false, null));
                }
                #endregion

                string invoiceId = $"{invoiceDTO.TypeOfProduct}-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid().ToString("N").Substring(0, 6)}";

                Guid.TryParse(claims["sub"].ToString(), out Guid userId);

                var carts = await CartDAO.GetInstance().GetAllCartItemsByIdUser(userId);
                if (carts.Count == 0)
                {
                    return NotFound(ResponseHelper.Response(404, "No cart item found", false, null));
                }
                var totalPrice = carts.Sum(item => item.Price * item.Quantity);

                var invoice = new Invoice
                {
                    Id = invoiceId,
                    TypeOfProduct = invoiceDTO.TypeOfProduct,
                    UserId = userId,
                    CustomerName = invoiceDTO.CustomerName,
                    Phone = invoiceDTO.Phone,
                    Email = invoiceDTO.Email,
                    DateCreate = DateTime.UtcNow,
                    TotalAmount = totalPrice,
                    IsPaid = false,
                    Status = "Pending"
                };



                var invoiceItems = new List<InvoiceItem>();
                foreach (var cartItem in carts)
                {

                    if (invoiceDTO.TypeOfProduct == "accessory")
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
                    else
                    {
                        invoiceItems.Add(new InvoiceItem
                        {
                            InvoiceId = invoiceId,
                            ProductName = cartItem.ProductName,
                            Quantity = cartItem.Quantity,
                            UnitPrice = cartItem.Price,
                            CarId = cartItem.ProductId
                        });
                    }

                }


                if (await InvoicesDAO.GetInstance().CreateInvoiceAsync(invoice, invoiceItems))
                {
                    return Ok(new DataResponse
                    {
                        StatusCode = 200,
                        Message = "Create invoice successfully",
                        Success = true,
                        Data = invoiceId
                    });
                }
                {
                    return Ok(new DataResponse
                    {
                        StatusCode = 200,
                        Message = "Create invoice failed",
                        Success = true
                    });
                }

            }
            catch (Exception ex)
            {
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