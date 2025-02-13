using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    [Table("CarColor")]
    public class CarColor
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("Color ID")]
        public int ColorId { get; set; }
        [Column("Color Name")]
        public string? ColorName { get; set; }
        [Column("Color Image")]
        public string? ColorImage { get; set; }
        [Column("Is Deleted")]
        public bool IsDeleted { get; set; }
        [Column("Car ID")]
        public int CarId { get; set; }
        public Cars? Car { get; set; }
    }
}