using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    [Table("Category")]
    public class Category
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("Category ID")]
        public int Id { get; set; }
        [Column("Category Name")]
        public string? Name { get; set; }
        [Column("Category Parents ID")]
        public int ParentsId { get; set; }
        [Column("Is Deleted")]
        public bool IsDeleted { get; set; }
        public ICollection<Accessory> Accessories { get; set; } = new List<Accessory>();

    }
}