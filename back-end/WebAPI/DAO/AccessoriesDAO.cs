using WebAPI.DataContext;
using WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.DAO
{
    public class AccessoriesDAO
    {
        private static AccessoriesDAO instance;
        private static readonly object lockIntance = new object();

        private AccessoriesDAO() { }

        public static AccessoriesDAO GetInstance()
        {
            if (instance == null)
            {
                lock (lockIntance)
                {
                    if (instance == null)
                    {
                        instance = new AccessoriesDAO();
                    }
                }
            }
            return instance;
        }

        public async Task<List<Accessory>> GetAllAccessories()
        {
            using (var context = new VinfastContext())
            {
                return await context.Accessories.ToListAsync();
            }
        }

        public async Task<Accessory> GetAccessoryById(int id)
        {
            using (var context = new VinfastContext())
            {
                return await context.Accessories.FindAsync(id);
            }
        }

        public async Task<List<Accessory>> GetAccessoriesByCategoryId(int categoryId)
        {
            using (var context = new VinfastContext())
            {
                return await context.Accessories.Where(accessory => accessory.CategoryId == categoryId).ToListAsync();
            }
        }
    }
}