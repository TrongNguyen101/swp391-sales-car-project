using Microsoft.AspNetCore.Mvc;
using WebAPI.DAO;
using WebAPI.DTO;
using WebAPI.Utils.AutoMapper;
using WebAPI.Utils.JwtTokenHelper;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAllUser()
        {
            try
            {
                var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
                var token = authorizationHeader.Split(" ")[1];
                bool isAuthorized = JwtTokenHelper.VerifyJwtToken(token);
                var role = JwtTokenHelper.GetUserRole(token);
                if (!isAuthorized)
                {
                    return Unauthorized(new DataResponse
                    {
                        StatusCode = 401,
                        Success = false,
                        Message = "Unauthorized token is invalid",
                    });
                }
                if (role.ToString() != "1")
                {
                    return Unauthorized(new DataResponse
                    {
                        StatusCode = 401,
                        Success = false,
                        Message = "Unauthorized access denied",
                    });
                }
                var users = await UsersDAO.GetInstance().GetAllUsersAsync();
                if (users == null || users.Count == 0)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "No user found",
                        Success = false
                    });
                }
                var usersListDTO = AutoMapper.ToUserDTOList(users);
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Message = "Get all users successfully",
                    Success = true,
                    Data = usersListDTO
                });
            }
            catch (Exception e)
            {
                return BadRequest(new DataResponse
                {
                    StatusCode = 400,
                    Message = e.Message,
                    Success = false
                });
            }
        }

        [HttpPut("Edit")]
        public async Task<IActionResult> EditUser(UserDTO userData)
        {
            try
            {
                var user = UsersDAO.GetInstance().FindUserById(userData.UserId);
                if (user == null)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "User not found",
                        Success = false
                    });
                }
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Message = "Edit user successfully",
                    Success = true
                });
            }
            catch (Exception e)
            {
                return BadRequest(new DataResponse
                {
                    StatusCode = 400,
                    Success = false,
                    Message = e.Message
                });
            }
        }

        [HttpGet("CountUser")]
        public async Task<IActionResult> CountUser()
        {
            try
            {
                var userCount = await UsersDAO.GetInstance().CountUsersAsync();
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Message = "Count user successfully",
                    Success = true,
                    Data = userCount
                });
            }
            catch (Exception)
            {
                return BadRequest(new DataResponse
                {
                    StatusCode = 400,
                    Success = false,
                    Message = "Error"
                });
            }
        }
    }
}