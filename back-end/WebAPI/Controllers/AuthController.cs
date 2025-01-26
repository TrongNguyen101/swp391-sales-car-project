using Microsoft.AspNetCore.Mvc;
using WebAPI.DAO;
using WebAPI.Utils.EncyptHelper;
using WebAPI.Utils.AutoMapper;
using WebAPI.DTO;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO UserLogin)
        {
            var userDAO = await UsersDAO.GetInstance().findUserByEmail(UserLogin.Email);
            if (userDAO == null)
            {
                return NotFound();
            }
            if (userDAO.Password != EncyptHelper.Sha256Encrypt(UserLogin.Password))
            {
                return Unauthorized();
            }
            return Ok(AutoMapper.ToUserDTO(userDAO));
        }
    }
}