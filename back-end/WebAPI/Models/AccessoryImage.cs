using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    [Table("AccessoryColor")]
    public class AccessoryImage
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
        [Column("Accessory ID")]
        public int AccessoryId { get; set; }
        public Accessory? Accessory { get; set; }
    }
}