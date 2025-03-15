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

        public async Task<Cars> GetCarByName(string name)
        {
            using (var context = new VinfastContext())
            {
                return await context.Cars.FirstOrDefaultAsync(c => c.Name == name);
            }
        }


        public async Task<List<CarColor>> GetCarColorsByCarId(int carId)
        {
            using (var context = new VinfastContext())
            {
                return await context.CarColor.Where(CarColor => CarColor.CarId == carId).ToListAsync();
            }
        }

        public async Task<bool> DeleteCarById(Cars car)
        {
            try
            {
                using (var context = new VinfastContext())
                {
                    context.Attach(car);
                    context.Entry(car).Property(c => c.IsDeleted).IsModified = true;
                    await context.SaveChangesAsync();
                    return true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }

        public async Task<bool> AdminAddMoreCar(Cars car)
        {
            try
            {
                using (var context = new VinfastContext())
                {
                    context.Attach(car);
                    context.Entry(car).Property(c => c.Quantity).IsModified = true;
                    await context.SaveChangesAsync();
                    return true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }
        public async Task<bool> CreateCar(Cars car)
        {
            try
            {
                using (var context = new VinfastContext())
                {
                    await context.Cars.AddAsync(car);
                    await context.SaveChangesAsync();
                    return true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }
        public async Task<bool> UpdateCar(Cars car)
        {
            try
            {
                using (var context = new VinfastContext())
                {
                    context.Cars.Update(car);
                    await context.SaveChangesAsync();
                    return true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }
    }
}