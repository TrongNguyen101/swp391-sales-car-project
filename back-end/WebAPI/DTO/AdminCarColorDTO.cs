using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTO
{
    public class AdminCarColorDTO
    {
        [Required]
        public int ColorId { get; set; }

        [StringLength(100)]
        public string? ColorName { get; set; }

        [StringLength(100)]
        public string? ColorImage { get; set; }

        public bool IsDeleted { get; set; }

        [Required]
        public int CarId { get; set; }
    }
}