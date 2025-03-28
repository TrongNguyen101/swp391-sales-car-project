namespace WebAPI.DTO
{
    public class ImportExportHistoryDTO
    {
        public int Id { get; set; }

        public string? ProductName { get; set; }

        public string? Type { get; set; }

        public int Quantity { get; set; }

        public string? TransactionDate { get; set; }

        public string? Note { get; set; }

        public int? AccessoryId { get; set; }

        public int? CarId { get; set; }
    }
}