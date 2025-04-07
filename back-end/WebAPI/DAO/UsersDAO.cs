using WebAPI.DataContext;
using WebAPI.Models;
using Microsoft.EntityFrameworkCore;
using WebAPI.DTO;
using WebAPI.Utils.EncyptHelper;

namespace WebAPI.DAO
{
    /// <summary>
    /// Singleton class for UsersDAO.
    /// </summary>
    public class UsersDAO
    {
        /// <summary>
        /// The singleton instance of UsersDAO.
        /// </summary>
        public static volatile UsersDAO? Instance;

        /// <summary>
        /// An object used for locking to ensure thread safety.
        /// </summary>
        public static readonly object lockObject = new object();

        /// <summary>
        /// Gets the singleton instance of UsersDAO.
        /// </summary>
        /// <returns>The singleton instance of UsersDAO.</returns>
        public static UsersDAO GetInstance()
        {
            if (Instance == null)
            {
                lock (lockObject)
                {
                    if (Instance == null)
                    {
                        Instance = new UsersDAO();
                    }
                }
            }
            return Instance;
        }

        public async Task<Users?> findUserByEmail(string email)
        {
            using (var context = new VinfastContext())
            {
                return await context.Users.Where(u => u.Email == email && u.IsDeleted == false).FirstOrDefaultAsync();
            }
        }

        public async Task<Users?> findStaffByEmail(string email)
        {
            using (var context = new VinfastContext())
            {
                return await context.Users.Where(u => u.Email == email).FirstOrDefaultAsync();
            }
        }

        public async Task<Users?> FindUserById(string userId)
        {
            using (var context = new VinfastContext())
            {
                return await context.Users.Where(u => u.Id.ToString() == userId).FirstOrDefaultAsync();
            }
        }

        /// <summary>
        /// Adds a new user to the database.
        /// </summary>
        /// <param name="user">The user to add.</param>
        public async Task AddUser(Users user)
        {
            try
            {
                using var context = new VinfastContext();
                await context.Users.AddAsync(user);
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine("Failed to add new user to database: " + ex.Message);
                // Handle database-specific errors
                throw new Exception("Failed to add new user to database: " + ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occurred while adding user: " + ex.Message);
                // Handle other unexpected errors
                throw new Exception("An error occurred while adding user: " + ex.Message);
            }
        }

        /// <summary>
        /// Updates an existing user in the database.
        /// </summary>
        /// <param name="user">The user to update.</param>
        public async Task UpdateUser(Users user)
        {
            try
            {
                using (var context = new VinfastContext())
                {
                    context.Users.Update(user);
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        /// <summary>
        /// Marks a user as deleted in the database.
        /// </summary>
        /// <param name="user">The user to delete.</param>
        public async Task DeleteUser(Users user)
        {
            try
            {
                using (var context = new VinfastContext())
                {
                    context.Users.Update(user);
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Failed to delete user: " + e);
                throw new Exception(e.Message);
            }

        }

        public async Task<bool> ResetPassword(ChangePasswordRequestDTO request)
        {
            using (var context = new VinfastContext())
            {
                var user = await context.Users.Where(u => u.Email == request.Email).FirstOrDefaultAsync();
                if (user == null)
                {
                    return false;
                }
                user.Password = EncyptHelper.Sha256Encrypt(request.Password);
                context.Entry(user).Property(u => u.Password).IsModified = true; // Only update password
                context.SaveChanges();

                return true;
            }
        }

        public async Task<List<Users>> GetAllUsersAsync()
        {
            try
            {
                using (var context = new VinfastContext())
                {
                    return await context.Users.Where(user => user.RoleId == 2).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed to get all users from database. Error: ", ex);
                return null;
            }
        }

        public async Task<List<Users>> GetAllStaffsAsync()
        {
            try
            {
                using (var context = new VinfastContext())
                {
                    return await context.Users.Where(user => user.RoleId == 3).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed to get all staff from database. Error: ", ex);
                return null;
            }
        }

        public async Task<int> CountUsersAsync()
        {
            using (var context = new VinfastContext())
            {
                return await context.Users.Where(user => user.RoleId == 2 && user.IsDeleted == false).CountAsync();
            }
        }

        public async Task<Users> SearchUsersAsync(string email)
        {
            using (var context = new VinfastContext())
            {
                return await context.Users.Where(user => user.Email.Contains(email) && user.RoleId == 2).FirstOrDefaultAsync();
            }
        }
    }
}