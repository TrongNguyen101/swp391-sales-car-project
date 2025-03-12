using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTO
{
    public class AdminAddMoreCar
    {
        public int CardId { get; set; }
        public int Quantity { get; set; }
    }
}