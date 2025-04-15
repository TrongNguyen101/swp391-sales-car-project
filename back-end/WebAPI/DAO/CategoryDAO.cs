using Microsoft.EntityFrameworkCore;
using WebAPI.DataContext;
using WebAPI.Models;

namespace WebAPI.DAO
{
    public class CategoryDAO
    {
        private static CategoryDAO instance;
        private static readonly object lockIntance = new object();

        private CategoryDAO() { }

        public static CategoryDAO GetInstance()
        {
            if (instance == null)
            {
                lock (lockIntance)
                {
                    if (instance == null)
                    {
                        instance = new CategoryDAO();
                    }
                }
            }
            return instance;
        }

        public async Task<List<Category>> GetAllCategories()
        {
            using (var context = new VinfastContext())
            {
                return await context.Categories.ToListAsync();
            }
        }

        public async Task<Category> GetCategoryById(int id)
        {
            using (var context = new VinfastContext())
            {
                return await context.Categories.FindAsync(id);
            }
        }
    }
}