using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    [Table("Users")]
    public class Users
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("User ID")]
        public Guid Id { get; set; }
        [Column("User Name")]
        public string? UserName { get; set; }
        [Column("User Address")]
        public string? Address { get; set; }
        [Column("Phone Number")]
        public string? Phone { get; set; }
        [Column("User Email")]
        public string? Email { get; set; }
        [Column("User Password")]
        public string? Password { get; set; }
        [Column("Created At")]
        public DateTime CreatedAt { get; set; }
        [Column("Is Deleted")]
        public bool IsDeleted { get; set; }
        [Column("Last Change")]
        public DateTime LastChange { get; set; }
        [Column("User Role")]
        public int RoleId { get; set; }
        public Roles? Role { get; set; }
    }
}