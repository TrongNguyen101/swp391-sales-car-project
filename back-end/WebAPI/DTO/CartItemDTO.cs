using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTO
{
    public class CartItemDTO
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        [StringLength(255)]
        public string ProductName { get; set; } = string.Empty;

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be a positive value")]
        public double Price { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1")]
        public int Quantity { get; set; }

        [Required]
        public string ImageUrl { get; set; } = string.Empty;

        [Required]
        public Guid UserId { get; set; }

        public double TotalPrice { get; set; }
    }
}