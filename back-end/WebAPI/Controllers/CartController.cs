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
    public class CartController : ControllerBase
    {
        /// <summary>
        /// Get all cart items
        /// </summary>
        /// <returns>Return all cart items</returns>
        [HttpPost("addAccessoryToCart")]
        public async Task<ActionResult> AddAccessoryToCart([FromBody] CartItemDTO cartItemDTO)
        {
            try
            {
                #region Authentication, Authorization and validation
                // Get token
                var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

                // Check token
                if (authorizationHeader == null || !authorizationHeader.StartsWith("Bearer "))
                {
                    return Unauthorized(ResponseHelper.Response(401, "Authentication token is missing or invalid", false, null));
                }
                // Format token
                var token = authorizationHeader.Split(" ")[1];

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
                // Check model state
                if (!ModelState.IsValid)
                {
                    return BadRequest(ResponseHelper.Response(400, "The model state is invalid", false, null));
                }
                #endregion

                #region Check accessory valid
                // Get accessory by id
                var accessoryAdded = await AccessoriesDAO.GetInstance().GetAccessoryById(cartItemDTO.ProductId);

                // Check accessory exist
                if (accessoryAdded == null || accessoryAdded.IsDeleted == true)
                {
                    return NotFound(ResponseHelper.Response(404, "Product not found", false, null));
                }
                // check quantity of accessory
                if (accessoryAdded.Quantity <= 0)
                {
                    return BadRequest(ResponseHelper.Response(400, "Accessory is out of stock", false, null));

                }
                #endregion

                #region Add accessory to cart
                // Check cart item exist
                var cartItemExist = await CartDAO.GetInstance().GetCartItemByProductIdAndUserId(cartItemDTO.ProductId, cartItemDTO.UserId);

                // If cart item exist, update quantity
                if (cartItemExist != null)
                {
                    cartItemExist.Quantity += 1;

                    if (await CartDAO.GetInstance().UpdateCartItem(cartItemExist))
                    {
                        await AccessoriesDAO.GetInstance().UpdateAccessory(accessoryAdded);
                        accessoryAdded.Quantity -= 1;
                        return Ok(ResponseHelper.Response(200, "Updated cart successfully", true, null));

                    }
                    else
                    {
                        return BadRequest(ResponseHelper.Response(400, "Error: can't update cart", false, null));
                    }
                }

                // Create cart item
                var newCartItem = AutoMapper.ToCartItem(cartItemDTO);
                // Add cart item
                if (await CartDAO.GetInstance().AddCartItem(newCartItem))
                {
                    await AccessoriesDAO.GetInstance().UpdateAccessory(accessoryAdded);
                    accessoryAdded.Quantity -= 1;
                    return Ok(ResponseHelper.Response(200, "Add accessory to cart successfully", true, null));
                }
                else
                {
                    return BadRequest(ResponseHelper.Response(400, "Error: can't add accessory to cart", false, null));
                }

                #endregion
            }
            catch
            {
                return BadRequest(ResponseHelper.Response(500, "Internal server error. Please contact support.", false, null));

            }
        }

        /// <summary>
        /// Remove item from cart
        /// </summary>
        /// <param name="itemId"></param>
        /// <returns>Return status code</returns>
        [HttpDelete]
        public IActionResult RemoveItemFromCart(int itemId)
        {
            return Ok();
        }

        /// <summary>
        /// Update item quantity in cart
        /// </summary>
        /// <param name="itemId"></param>
        /// <param name="quantity"></param>
        /// <returns>Return status code</returns>
        [HttpPut]
        public IActionResult UpdateItemQuantity(int itemId, int quantity)
        {
            return Ok();
        }

        /// <summary>
        /// Checkout
        /// </summary>
        /// <returns>Return status code</returns>
        [HttpPost]
        [Route("checkout")]
        public IActionResult Checkout()
        {
            return Ok();
        }
    }
}
