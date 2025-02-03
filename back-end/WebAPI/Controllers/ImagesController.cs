using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        [HttpGet("Car/{imageName}")]
        public IActionResult GetImage(string imageName)
        {
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "Images/CarImages", imageName);
            if (!System.IO.File.Exists(imagePath))
            {
                return NotFound();
            }
            var image = System.IO.File.OpenRead(imagePath);
            return File(image, "image/jpeg");
        }
    }
}