using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTO
{
    public class AdminAddMoreCarDTO
    {
        public int CardId { get; set; }
        public int Quantity { get; set; }
    }
}