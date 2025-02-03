using WebAPI.DataContext;
using WebAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebAPI.DAO
{
    public class CarsDAO
    {
        private static CarsDAO instance;
        private static readonly object padlock = new object();

        private CarsDAO() { }

        public static CarsDAO GetInstance()
        {
            if (instance == null)
            {
                lock (padlock)
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
    }
}