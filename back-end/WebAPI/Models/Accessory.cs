using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    [Table("Accessory")]
    public class Accessory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("Accessory ID")]
        public int Id { get; set; }
        [Column("Accessory Name")]
        public string? Name { get; set; }
        [Column("Accessory Image")]
        public string? Image { get; set; }
        [Column("Accessory Price")]
        public double Price { get; set; }
        [Column("Is Deleted")]
        public bool IsDeleted { get; set; }
        [Column("Category ID")]
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
    }
}