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
        [HttpGet]
        public async Task<ActionResult> GetAllCarts()
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
                // Check model state
                if (!ModelState.IsValid)
                {
                    return BadRequest(ResponseHelper.Response(400, "The model state is invalid", false, null));
                }
                #endregion

                Guid.TryParse(claims["sub"].ToString(), out Guid userId);

                var carts = await CartDAO.GetInstance().GetAllCartItemsByIdUser(userId);
                if (carts.Count == 0)
                {
                    return NotFound(ResponseHelper.Response(404, "No cart item found", false, null));
                }
                var cartDTOs = AutoMapper.ToCartItemDTOList(carts);
                return Ok(ResponseHelper.Response(200, "Get all cart item successfully", true, cartDTOs));
            }
            catch (Exception ex)
            {
                Console.WriteLine("Get all cart item failed: " + ex.Message);
                return BadRequest(ResponseHelper.Response(404, "Internal server error. Please contact support.", false, null));
            }
        }

        /// <summary>
        /// Get all cart items
        /// </summary>
        /// <returns>Return all cart items</returns>
        [HttpPost("addAccessoryToCart")]
        public async Task<ActionResult> AddAccessoryToCart([FromBody] CartItemDTO cartItemDTO)
        {
            try
            {
                #region Authentication, Authorization
                // Check authentication and authorization of user based on the specified HTTP context and role that need to check for this function
                // If the user is not authenticated or authorized, return error message
                // If the user is authenticated and authorized, return claims of user
                // admin role id = 1
                // customer role id = 2
                // staff role id = 3
                var (isSuccess, errorMessage, claims) = JwtTokenHelper.AuthenticateAndAuthorize(HttpContext, 2);
                if (!isSuccess)
                {
                    // Return error message if the user is not authenticated or authorized
                    return Unauthorized(ResponseHelper.ResponseError(401, errorMessage ?? "Unknown error", false, null));
                }
                #endregion

                #region Check accessory valid
                // Get accessory by id
                var accessoryAdded = await AccessoriesDAO.GetInstance().GetAccessoryById(cartItemDTO.ProductId);

                // Check accessory exist
                if (accessoryAdded == null || accessoryAdded.IsDeleted == true)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "Product not found", false, null));
                }
                // check quantity of accessory
                if (accessoryAdded.Quantity <= 0)
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Accessory is out of stock", false, null));

                }
                #endregion

                #region Add accessory to cart
                // Check cart item exist
                var cartItemExist = await CartDAO.GetInstance().GetCartItemByProductIdAndUserId(cartItemDTO.ProductId, cartItemDTO.UserId);

                // If cart item exist, update quantity
                if (cartItemExist != null)
                {
                    cartItemExist.Quantity += 1;

                    if (cartItemExist.Quantity > accessoryAdded.Quantity)
                    {
                        return BadRequest(ResponseHelper.ResponseError(400, accessoryAdded.Name + " is not enough", false, null));
                    }

                    if (await CartDAO.GetInstance().UpdateCartItem(cartItemExist))
                    {
                        return Ok(ResponseHelper.ResponseError(200, "Updated cart successfully", true, null));

                    }
                    else
                    {
                        return BadRequest(ResponseHelper.ResponseError(400, "Error: can't update cart", false, null));
                    }
                }

                // Create cart item
                var newCartItem = AutoMapper.ToCartItem(cartItemDTO);
                // Add cart item
                if (await CartDAO.GetInstance().AddCartItem(newCartItem))
                {
                    return Ok(ResponseHelper.ResponseSuccess(200, "Add accessory to cart successfully", true, null));
                }
                else
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Error: can't add accessory to cart", false, null));
                }

                #endregion
            }
            catch (Exception ex)
            {
                Console.WriteLine("Add accessory to cart failed: " + ex);
                return BadRequest(ResponseHelper.ResponseError(500, "Internal server error. Please contact support.", false, null));
            }
        }

        /// <summary>
        /// Remove item from cart
        /// </summary>
        /// <param name="itemId"></param>
        /// <returns>Return status code</returns>
        [HttpDelete("delete/{cartItemId}")]
        public async Task<ActionResult> RemoveItemFromCart(int cartItemId)
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

                var cartItemExist = await CartDAO.GetInstance().GetCartItemById(cartItemId);

                if (cartItemExist == null)
                {
                    return NotFound(ResponseHelper.Response(404, "Cart item not found", false, null));
                }

                // If cart item exist, delete cart item
                if (await CartDAO.GetInstance().DeleteCartItem(cartItemExist))
                {
                    return Ok(ResponseHelper.Response(200, "Deleted cart item successfully", true, null));
                }
                else
                {
                    return BadRequest(ResponseHelper.Response(400, "Error: can't delete cart item", false, null));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Delete cart item failed: " + ex);
                return BadRequest(ResponseHelper.Response(404, "Internal server error. Please contact support.", false, null));
            }
        }

        /// <summary>
        /// Update item quantity in cart
        /// </summary>
        /// <param name="itemId"></param>
        /// <param name="quantity"></param>
        /// <returns>Return status code</returns>
        [HttpPost("updateItemQuantity")]
        public async Task<ActionResult> UpdateItemQuantity([FromBody] List<CartItemDTO> listCartItemDTO)
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

                if (listCartItemDTO.Count == 0)
                {
                    return BadRequest(ResponseHelper.Response(400, "The model state is invalid", false, null));
                }

                #endregion

                foreach (var cartItemDTO in listCartItemDTO)
                {
                    // Check model state
                    if (!ModelState.IsValid)
                    {
                        return BadRequest(ResponseHelper.Response(400, "The model state is invalid", false, null));
                    }
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

                    #region Update accessory in cart
                    // Check cart item exist
                    var cartItemExist = await CartDAO.GetInstance().GetCartItemByProductIdAndUserId(cartItemDTO.ProductId, cartItemDTO.UserId);

                    // If cart item exist, update quantity
                    if (cartItemExist != null)
                    {
                        cartItemExist.Quantity = cartItemDTO.Quantity;

                        // check quantity of accessory
                        if (accessoryAdded.Quantity < cartItemExist.Quantity)
                        {
                            return BadRequest(ResponseHelper.Response(400, cartItemDTO.ProductName + " is not enough", false, null));
                        }

                        if (!await CartDAO.GetInstance().UpdateCartItem(cartItemExist))
                        {
                            return BadRequest(ResponseHelper.Response(400, "Error: can't update cart", false, null));
                        }
                    }
                    else
                    {
                        return NotFound(ResponseHelper.Response(404, "Cart item not found", false, null));
                    }
                    #endregion
                }

                return Ok(ResponseHelper.Response(200, "Updated cart successfully", true, null));
            }
            catch (Exception ex)
            {
                Console.WriteLine("Update item quantity failed: " + ex);
                return BadRequest(ResponseHelper.Response(500, "Internal server error. Please contact support.", false, null));
            }
        }
    }
}
