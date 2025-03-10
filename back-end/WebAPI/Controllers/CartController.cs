using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTO;

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
        public async Task<ActionResult> AddProductToCart()
        {

            return BadRequest(new DataResponse
            {
                StatusCode = 400,
                Message = "Error",
                Success = false
            });
        }

        /// <summary>
        /// Add item to cart
        /// </summary>
        /// <param name="itemId"></param>
        /// <returns>Return status code</returns>
        [HttpPost]
        public IActionResult AddItemToCart(int itemId)
        {
            return Ok();
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
