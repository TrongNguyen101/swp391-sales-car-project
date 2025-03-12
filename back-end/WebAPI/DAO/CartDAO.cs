using WebAPI.DataContext;
using WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.DAO
{
    public class CartDAO
    {
        private static CartDAO instance;
        private static readonly object lockIntance = new object();

        private CartDAO() { }

        public static CartDAO GetInstance()
        {
            if (instance == null)
            {
                lock (lockIntance)
                {
                    if (instance == null)
                    {
                        instance = new CartDAO();
                    }
                }
            }
            return instance;
        }

        public async Task<List<CartItem>> GetAllCartItems()
        {
            using (var context = new VinfastContext())
            {
                return await context.CartItems.ToListAsync();
            }
        }

        public async Task<bool> AddCartItem(CartItem cartItem)
        {
            try
            {
                using (var context = new VinfastContext())
                {
                    context.CartItems.Add(cartItem);
                    await context.SaveChangesAsync();
                    return true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Add cart item falid:" + ex);

                return false;
            }
        }

        public async Task<CartItem> GetCartItemByProductIdAndUserId(int productId, Guid userId)
        {
            using (var context = new VinfastContext())
            {
                return await context.CartItems.FirstOrDefaultAsync(x => x.ProductId == productId && x.UserId == userId);
            }
        }

        public async Task<bool> UpdateCartItem(CartItem cartItem)
        {
            try
            {
                using (var context = new VinfastContext())
                {
                    context.Entry(cartItem).State = EntityState.Modified;
                    await context.SaveChangesAsync();
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }
    }
}