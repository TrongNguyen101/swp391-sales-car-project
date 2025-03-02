using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    [Table("TestDriveRegistrations")]
    public class TestDriveRegistration
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("TestDrive ID")]
        public int Id { get; set; }

        [Column("Customer Name")]
        [Required]
        public string FullName { get; set; }

        [Column("Phone Number")]
        [Required]
        [Phone]
        public string Phone { get; set; }

        [Column("Customer Email")]
        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Column("Car ID")]
        [Required]
        public int CarId { get; set; }
        [ForeignKey("CarId")]
        public Cars? Car { get; set; }

        [Column("Description")]
        public string? Description { get; set; } 
    }
}
