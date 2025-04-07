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

        public async Task<List<Cars>> StaffGetAllCars()
        {
            using (var context = new VinfastContext())
            {
                return await context.Cars.Where(c => c.IsDeleted == false).ToListAsync();
            }
        }

        public async Task<List<Cars>> UserGetAllCars()
        {
            using (var context = new VinfastContext())
            {
                return await context.Cars
                    .Where(c => c.IsShowed == true && c.IsDeleted == false)
                    .ToListAsync();
            }
        }

        public async Task<Cars> GetCarById(int id)
        {
            using (var context = new VinfastContext())
            {
                return await context.Cars.FindAsync(id);
            }
        }

        public async Task<Cars> UserGetCarById(int id)
        {
            using (var context = new VinfastContext())
            {
                var car = await context.Cars.FindAsync(id);
                if (car == null || car.IsDeleted == true || car.IsShowed == false)
                {
                    return null;
                }
                return car;
            }
        }



        public async Task<Cars> GetCarByName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return null;
            }

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

        public async Task<bool> CheckColorImageExist(int carId, string colorName)
        {
            using (var context = new VinfastContext())
            {
                var carColor = await context.CarColor.FirstOrDefaultAsync(cc => cc.CarId == carId && cc.ColorName == colorName);
                if (carColor != null)
                {
                    return true; // Color image exists
                } else {
                    return false; // Color image does not exist
                }
            }
        }

        public async Task<bool> DeleteCarById(Cars car)
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

        public async Task<bool> CreateCarColor(CarColor carColor)
        {
            try
            {
                using (var context = new VinfastContext())
                {
                    await context.CarColor.AddAsync(carColor);
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
        public async Task<bool> DeleteColorImageOfCar(CarColor carColor)
        {
            try
            {
                using (var context = new VinfastContext())
                {
                    context.CarColor.Remove(carColor);
                    await context.SaveChangesAsync();
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        public async Task<CarColor> GetColorImageOfCarById(int carColorId)
        {
            using (var context = new VinfastContext())
            {
                return await context.CarColor.FindAsync(carColorId);
            }
        }
    }
}