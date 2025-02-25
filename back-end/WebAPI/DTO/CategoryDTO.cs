namespace WebAPI.DTO
{
    public class CategoryDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int ParentsId { get; set; }
    }
}