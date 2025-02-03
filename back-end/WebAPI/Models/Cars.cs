using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    [Table("Cars")]
    public class Cars
    {
        [Key]
        [Column("Car ID")]
        public int Id { get; set; }

        [Column("Car Name")]
        public string? Name { get; set; }

        [Column("Car Price")]
        public string? Price { get; set; }

        [Column("Car Seat")]
        public int Seat { get; set; }

        [Column("Car Image")]
        public string? Image { get; set; }
    }
}