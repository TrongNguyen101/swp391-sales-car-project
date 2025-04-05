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

        public async Task<List<Accessory>> StaffGetAllAccessories()
        {
            using (var context = new VinfastContext())
            {
                return await context.Accessories.Where(c => c.IsDeleted == false)
                                                .ToListAsync();
            }
        }

        public async Task<List<Accessory>> UserGetAllAccessories()
        {
            using (var context = new VinfastContext())
            {
                return await context.Accessories
                                    .Where(c => c.IsShowed == true && c.IsDeleted == false)
                                    .ToListAsync();
            }
        }

        public async Task<Accessory> GetAccessoryById(int id)
        {
            using (var context = new VinfastContext())
            {
                return await context.Accessories.FindAsync(id);
            }
        }

        public async Task<Accessory> UserGetAccessoryById(int id)
        {
            using (var context = new VinfastContext())
            {
                var accessory = await context.Accessories.FindAsync(id);
                if (accessory == null || accessory.IsDeleted == true || accessory.IsShowed == false)
                {
                    return null;
                }

                return accessory;
            }
        }

        public async Task<List<Accessory>> GetAccessoriesByCategoryId(int categoryId)
        {
            using (var context = new VinfastContext())
            {
                return await context.Accessories.Where(accessory => accessory.CategoryId == categoryId).ToListAsync();
            }
        }

        public async Task<List<AccessoryImage>> GetAccessoryImagesByAccessoryId(int accessoryId)
        {
            using (var context = new VinfastContext())
            {
                return await context.AccessoryImages.Where(image => image.AccessoryId == accessoryId).ToListAsync();
            }
        }

        public async Task<bool> UpdateAccessory(Accessory accessory)
        {
            try
            {
                using (var context = new VinfastContext())
                {
                    context.Accessories.Update(accessory);
                    await context.SaveChangesAsync();
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<Accessory> GetAccessoryByName(string name)
        {
            using (var context = new VinfastContext())
            {
                return await context.Accessories.FirstOrDefaultAsync(c => c.Name == name);
            }
        }

        public async Task<Accessory> CreateAccessory(Accessory accessory)
        {
            try
            {
                using (var context = new VinfastContext())
                {
                    await context.Accessories.AddAsync(accessory);
                    await context.SaveChangesAsync();
                    return accessory;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }

        public async Task<AccessoryImage> GetDetailImageAccessory(int id)
        {
            using (var context = new VinfastContext())
            {
                return await context.AccessoryImages.FindAsync(id);
            }
        }

        public async Task<bool> CreateDetailImageAccessory(AccessoryImage accessoryImage)
        {
            try
            {
                using (var context = new VinfastContext())
                {
                    await context.AccessoryImages.AddAsync(accessoryImage);
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

        public async Task<bool> DeleteDetailImageAccessory(AccessoryImage accessoryImage)
        {
            try
            {
                using (var context = new VinfastContext())
                {
                    context.AccessoryImages.Remove(accessoryImage);
                    await context.SaveChangesAsync();
                    return true;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Error: ", e);
                return false;
            }
        }

        public async Task<List<Accessory>> GetAccessoriesByListId(List<int> ids)
        {
            using (var context = new VinfastContext())
            {
                return await context.Accessories.Where(a => ids.Contains(a.Id)).ToListAsync();
            }
        }
        public async Task UpdateAccessories(List<Accessory> accessories)
        {
            using (var context = new VinfastContext())
            {
                context.Accessories.UpdateRange(accessories);
                await context.SaveChangesAsync();
            }
        }
    }
}