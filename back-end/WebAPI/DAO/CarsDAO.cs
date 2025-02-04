using WebAPI.DataContext;
using WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.DAO
{
    public class CarsDAO
    {
        private static CarsDAO instance;
        private static readonly object lockIntance = new object();

        private CarsDAO() { }

        public static CarsDAO GetInstance()
        {
            if (instance == null)
            {
                lock (lockIntance)
                {
                    if (instance == null)
                    {
                        instance = new CarsDAO();
                    }
                }
            }
            return instance;
        }

        public async Task<List<Cars>> GetAllCars()
        {
            using (var context = new VinfastContext())
            {
                return await context.Cars.ToListAsync();
            }
        }

        public async Task<Cars> GetCarById(int id)
        {
            using (var context = new VinfastContext())
            {
                return await context.Cars.FindAsync(id);
            }
        }
    }
}