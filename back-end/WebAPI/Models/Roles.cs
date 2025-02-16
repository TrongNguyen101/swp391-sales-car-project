using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    [Table("User Roles")]
    public class Roles
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("Role ID")]
        public int RoleId { get; set; }
        [Column("Role Name")]
        [Required]
        public string RoleName { get; set; } = null!;
        public ICollection<Users> Users { get; set; } = new List<Users>();
    }
}