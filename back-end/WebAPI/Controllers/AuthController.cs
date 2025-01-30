using Microsoft.AspNetCore.Mvc;
using WebAPI.DAO;
using WebAPI.Utils.EncyptHelper;
using WebAPI.Utils.AutoMapper;
using WebAPI.DTO;
using Microsoft.AspNetCore.Authorization;
using WebAPI.Utils.JwtTokenHelper;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        /// <summary>
        /// Authenticates a user based on the provided login credentials.
        /// </summary>
        /// <param name="UserLogin">The login request data transfer object containing the user's email and password.</param>
        /// <returns>
        /// An <see cref="IActionResult"/> indicating the result of the login attempt:
        /// <list type="bullet">
        /// <item><description>200 OK: If the login is successful, returns a token.</description></item>
        /// <item><description>404 Not Found: If the email is not found.</description></item>
        /// <item><description>401 Unauthorized: If the password is incorrect.</description></item>
        /// <item><description>400 Bad Request: If an exception occurs during the process.</description></item>
        /// </list>
        /// </returns>
        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO UserLogin)
        {
            try
            {
                var userDAO = await UsersDAO.GetInstance().findUserByEmail(UserLogin.Email);
                if (userDAO == null)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Success = false,
                        Message = "Email not found",
                    });
                }
                if (userDAO.Password != EncyptHelper.Sha256Encrypt(UserLogin.Password))
                {
                    return Unauthorized(new DataResponse
                    {
                        StatusCode = 401,
                        Success = false,
                        Message = "Password is incorrect",
                    });
                }
                var user = AutoMapper.ToUserDTO(userDAO);
                var token = JwtTokenHelper.GenerateJwtToken(user);
                var payloadRole = JwtTokenHelper.GetUserRole(token);
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Success = true,
                    Message = "Login successfully",
                    Data = new { token }
                });
            }
            catch (Exception e)
            {
                return BadRequest(new DataResponse
                {
                    StatusCode = 400,
                    Success = false,
                    Message = e.Message,
                });
            }
        }

        /// <summary>
        /// Authenticates a user based on the provided login credentials.
        /// </summary>
        /// <param name="registerRequest">The Register request data transfer object containing the user's data register.</param>
        /// <returns>
        /// An <see cref="IActionResult"/> indicating the result of the login attempt:
        /// <list type="bullet">
        /// <item><description>200 OK: If the login is successful, returns a token.</description></item>
        /// <item><description>409 Confict: If the email is already exist.</description></item>
        /// <item><description>400 Bad Request: If an exception occurs during the process.</description></item>
        /// </list>
        /// </returns>
        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterRequest registerRequest)
        {
            try
            {
                var userDAO = await UsersDAO.GetInstance().findUserByEmail(registerRequest.Email);
                if (userDAO != null)
                {
                    return Conflict(new DataResponse
                    {
                        StatusCode = 409,
                        Success = false,
                        Message = "Email already exists",
                    });
                }
                userDAO = new Users
                {
                    UserName = registerRequest.UserName.ToLower(),
                    Address = registerRequest.Address.ToLower(),
                    Phone = registerRequest.Phone,
                    Email = registerRequest.Email,
                    Password = EncyptHelper.Sha256Encrypt(registerRequest.Password),
                    CreatedAt = DateTime.UtcNow,
                    IsDeleted = false,
                    LastChange = DateTime.UtcNow,
                    RoleId = 2
                };
                UsersDAO.GetInstance().AddUser(userDAO);
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Success = true,
                    Message = "Register successfully",
                });
            }
            catch (Exception e)
            {
                return BadRequest(new DataResponse
                {
                    StatusCode = 400,
                    Success = false,
                    Message = e.Message,
                });
            }
        }

        /// <summary>
        /// Authenticates a user based on the provided login credentials.
        /// </summary>
        /// <param name="requestChangePassword">The change password request data transfer object containing the user's data change password.</param>
        /// <returns>
        /// An <see cref="IActionResult"/> indicating the result of the login attempt:
        /// <list type="bullet">
        /// <item><description>200 OK: If the login is successful, returns a token.</description></item>
        /// <item><description>404 Not Found: If the email is not found.</description></item>
        /// <item><description>401 Unauthorized: If the password is incorrect.</description></item>
        /// <item><description>400 Bad Request: If an exception occurs during the process.</description></item>
        /// </list>
        /// </returns>
        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword(RequestChangePassword requestChangePassword)
        {
            try
            {
                var user = await UsersDAO.GetInstance().findUserByEmail(requestChangePassword.Email);
                if (user == null)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Success = false,
                        Message = "Email not found",
                    });
                }
                if (user.Password != EncyptHelper.Sha256Encrypt(requestChangePassword.OldPassword))
                {
                    return Unauthorized(new DataResponse
                    {
                        StatusCode = 401,
                        Success = false,
                        Message = "Old password is incorrect",
                    });
                }
                user.Password = EncyptHelper.Sha256Encrypt(requestChangePassword.NewPassword);
                UsersDAO.GetInstance().UpdateUser(user);
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Success = true,
                    Message = "Change password successfully",
                });
            }
            catch (Exception e)
            {
                return BadRequest(new DataResponse
                {
                    StatusCode = 400,
                    Success = false,
                    Message = e.Message,
                });
            }
        }
    }
}