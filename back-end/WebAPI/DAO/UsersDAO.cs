using WebAPI.DataContext;
using WebAPI.Models;

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
    }
}