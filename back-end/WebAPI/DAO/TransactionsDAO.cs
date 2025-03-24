using WebAPI.DataContext;
using WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.DAO
{
    public class TransactionsDAO
    {
        private static TransactionsDAO instance;
        private static readonly object lockIntance = new object();

        private TransactionsDAO() { }

        public static TransactionsDAO GetInstance()
        {
            if (instance == null)
            {
                lock (lockIntance)
                {
                    if (instance == null)
                    {
                        instance = new TransactionsDAO();
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

        public async Task<List<Invoice>> GetAllDepositTransactions()
        {
            using (var context = new VinfastContext())
            {
                return await context.Invoices
                                    .Where(i => i.TypeOfProduct != "accessory")
                                    .ToListAsync();
            }
        }

        public async Task<List<Invoice>> GetAllAccessoryTransactions()
        {
            using (var context = new VinfastContext())
            {
                return await context.Invoices
                                    .Where(i => i.TypeOfProduct == "accessory")
                                    .ToListAsync();
            }
        }

        public async Task<List<InvoiceItem>> GetInvoiceItemsByInvoiceId(string invoiceId)
        {
            using (var context = new VinfastContext())
            {
                return await context.InvoiceItems
                                    .Where(ii => ii.InvoiceId == invoiceId)
                                    .ToListAsync();
            }
        }

        public async Task<bool> CreateListImportExportHistory(List<ImportExportHistory> importExportHistories)
        {
            using (var context = new VinfastContext())
            {
                using (var transaction = await context.Database.BeginTransactionAsync())
                {
                    try
                    {
                        await context.ImportExportHistories.AddRangeAsync(importExportHistories);
                        await context.SaveChangesAsync();
                        await transaction.CommitAsync();
                        return true;
                    }
                    catch (Exception ex)
                    {
                        await transaction.RollbackAsync();
                        Console.WriteLine($"Error create import export history: {ex}");
                        return false;
                    }
                }
            }
        }

        public async Task<bool> CreateImportExportHistory(ImportExportHistory importExportHistory)
        {
            try
            {
                using (var context = new VinfastContext())
                {
                    await context.ImportExportHistories.AddAsync(importExportHistory);
                    await context.SaveChangesAsync();
                    return true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error create import export history: {ex}");
                return false;
            }
        }
    }
}