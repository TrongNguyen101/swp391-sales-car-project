using WebAPI.DataContext;
using WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.DAO
{
    public class InvoicesDAO
    {
        private static InvoicesDAO instance;
        private static readonly object lockIntance = new object();

        private InvoicesDAO() { }

        public static InvoicesDAO GetInstance()
        {
            if (instance == null)
            {
                lock (lockIntance)
                {
                    if (instance == null)
                    {
                        instance = new InvoicesDAO();
                    }
                }
            }
            return instance;
        }


        public async Task<bool> CreateInvoiceAsync(Invoice invoice, List<InvoiceItem> invoiceItems)
        {
            using (var context = new VinfastContext())
            {
                using (var transaction = await context.Database.BeginTransactionAsync())
                {
                    try
                    {
                        // Thêm invoice vào database
                        await context.Invoices.AddAsync(invoice);
                        await context.SaveChangesAsync();

                        // Thêm danh sách invoiceItems cùng lúc
                        await context.InvoiceItems.AddRangeAsync(invoiceItems);
                        await context.SaveChangesAsync();

                        // Commit transaction nếu tất cả thành công
                        await transaction.CommitAsync();
                        return true;
                    }
                    catch (Exception ex)
                    {
                        // Rollback nếu có lỗi
                        await transaction.RollbackAsync();
                        Console.WriteLine($"Lỗi khi tạo hóa đơn: {ex}");
                        return false;
                    }
                }
            }
        }

        // Get invoice by VNPTranscationNo to check transaction existed
        public async Task<Invoice> GetInvoiceByVNPayTranscationNo(string vnpTranscationNo)
        {
            if (string.IsNullOrWhiteSpace(vnpTranscationNo))
            {
                return null;
            }
            using (var context = new VinfastContext())
            {
                return await context.Invoices.FirstOrDefaultAsync(i => i.VNPTransactionNo == vnpTranscationNo);
            }
        }

        public async Task<List<Invoice>> GetAllInvoices()
        {
            using (var context = new VinfastContext())
            {
                return await context.Invoices.ToListAsync();
            }
        }
    }
}