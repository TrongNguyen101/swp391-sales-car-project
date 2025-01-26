using Microsoft.AspNetCore.Mvc;
using WebAPI.DAO;
using WebAPI.Utils.EncyptHelper;
using WebAPI.Utils.AutoMapper;
using WebAPI.DTO;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private DataResponse DataResponse;

        public AuthController()
        {
            this.DataResponse = new DataResponse();
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO UserLogin)
        {
            var userDAO = await UsersDAO.GetInstance().findUserByEmail(UserLogin.Email);
            if (userDAO == null)
            {
                return NotFound(DataResponse = new DataResponse
                {
                    StatusCode = 404,
                    Success = false,
                    Message = "Email not found",
                    Data = null
                });
            }
            if (userDAO.Password != EncyptHelper.Sha256Encrypt(UserLogin.Password))
            {
                return Unauthorized(DataResponse = new DataResponse
                {
                    StatusCode = 401,
                    Success = false,
                    Message = "Password is incorrect",
                    Data = null
                });
            }
            return Ok(DataResponse = new DataResponse
            {
                StatusCode = 200,
                Success = true,
                Message = "Login successfully",
                Data = AutoMapper.ToUserDTO(userDAO)
            });
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(string email)
        {
            var userDAO = await UsersDAO.GetInstance().findUserByEmail(email);
            if (userDAO != null)
            {
                return Conflict(DataResponse = new DataResponse
                {
                    StatusCode = 409,
                    Success = false,
                    Message = "Email already exists",
                    Data = null
                });
            }
            return Ok(DataResponse = new DataResponse
            {
                StatusCode = 200,
                Success = true,
                Message = "Register successfully",
                Data = null
            });
        }
    }
}