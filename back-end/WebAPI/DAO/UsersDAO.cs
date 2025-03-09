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
                return await context.Users.Where(u => u.Email == email).FirstOrDefaultAsync();
            }
        }

        /// <summary>
        /// Adds a new user to the database.
        /// </summary>
        /// <param name="user">The user to add.</param>
        public void AddUser(Users user)
        {
            using (var context = new VinfastContext())
            {
                context.Users.Add(user);
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Updates an existing user in the database.
        /// </summary>
        /// <param name="user">The user to update.</param>
        public void UpdateUser(Users user)
        {
            using (var context = new VinfastContext())
            {
                context.Users.Update(user);
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Marks a user as deleted in the database.
        /// </summary>
        /// <param name="user">The user to delete.</param>
        public void DeleteUser(Users user)
        {
            using (var context = new VinfastContext())
            {
                user.IsDeleted = true;
                context.Users.Update(user);
                context.SaveChanges();
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
    }
}