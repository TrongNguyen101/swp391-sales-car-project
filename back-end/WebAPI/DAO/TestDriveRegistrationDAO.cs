using WebAPI.DataContext;
using WebAPI.Models;

namespace WebAPI.DAO
{
    public class TestDriveRegistrationDAO
    {
        private static TestDriveRegistrationDAO instance;
        private static readonly object lockInstance = new object();

        private TestDriveRegistrationDAO() { }

        public static TestDriveRegistrationDAO GetInstance()
        {
            if (instance == null)
            {
                lock (lockInstance)
                {
                    if (instance == null)
                    {
                        instance = new TestDriveRegistrationDAO();
                    }
                }
            }
            return instance;
        }

        public async Task<bool> RegisterTestDrive(TestDriveRegistration testDrive)
        {
            using (var context = new VinfastContext())
            {
                await context.TestDriveRegistrations.AddAsync(testDrive);
                return await context.SaveChangesAsync() > 0;
            }
        }
    }
}
