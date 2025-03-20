using WebAPI.DataContext;
using WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.DAO
{
    public class PaymentDAO
    {
        private static PaymentDAO instance;
        private static readonly object lockIntance = new object();

        private PaymentDAO() { }

        public static PaymentDAO GetInstance()
        {
            if (instance == null)
            {
                lock (lockIntance)
                {
                    if (instance == null)
                    {
                        instance = new PaymentDAO();
                    }
                }
            }
            return instance;
        }

        public async Task<List<Payment>> GetAllPayments()
        {
            using (var context = new VinfastContext())
            {
                return await context.Payments.ToListAsync();
            }
        }

        public async Task<Payment> GetCarById(int id)
        {
            using (var context = new VinfastContext())
            {
                return await context.Payments.FindAsync(id);
            }
        }

        public async Task<bool> CreatePayment(Payment payment)
        {
            try
            {
                using (var context = new VinfastContext())
                {
                    await context.Payments.AddAsync(payment);
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