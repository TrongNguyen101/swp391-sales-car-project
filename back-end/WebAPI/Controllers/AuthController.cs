using Microsoft.AspNetCore.Mvc;
using WebAPI.DAO;
using WebAPI.Utils.EncyptHelper;
using WebAPI.Utils.AutoMapper;
using WebAPI.DTO;
using Microsoft.AspNetCore.Authorization;
using WebAPI.Utils.JwtTokenHelper;
using WebAPI.Models;
using System.Text;
using System.Net.Mail;
using System.Net;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        // not done yet
        private readonly Dictionary<string, string> otpCodeStorage = new Dictionary<string, string>();

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
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO LoginRequest)
        {
            try
            {
                var userDAO = await UsersDAO.GetInstance().findUserByEmail(LoginRequest.Email);
                if (userDAO == null)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Success = false,
                        Message = "Email not found",
                    });
                }
                if (userDAO.Password != EncyptHelper.Sha256Encrypt(LoginRequest.Password))
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
        public async Task<IActionResult> Register([FromBody] RegisterRequest RegisterRequest)
        {
            try
            {
                var userDAO = await UsersDAO.GetInstance().findUserByEmail(RegisterRequest.Email);
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
                    Id = Guid.NewGuid(),
                    UserName = RegisterRequest.Fullname.ToLower(),
                    Address = null,
                    Phone = null,
                    Email = RegisterRequest.Email,
                    Password = EncyptHelper.Sha256Encrypt(RegisterRequest.Password),
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
        [HttpPost("SendOTP")]
        public async Task<IActionResult> SendOTP([FromBody] RequestForgotPassword request)
        {
            try
            {
                var user = await UsersDAO.GetInstance().findUserByEmail(request.Email);
                if (user == null)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Success = false,
                        Message = "Email not found",
                    });
                }
                var userDTO = AutoMapper.ToUserDTO(user);
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Success = true,
                    Message = "Email found",
                    Data = userDTO.Email,
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
        [HttpPost("veryfyOTP")]
        public async Task<IActionResult> VeryfyOTP([FromBody] RequestForgotPassword request)
        {
            try
            {
                // Not done yet
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Success = true,
                    Message = "OTP is correct",
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new DataResponse
                {
                    StatusCode = 400,
                    Success = false,
                    Message = ex.Message,
                });
            }
        }

        private string GenerateOTP(int lengthOTP = 6)
        {
            var random = new Random();
            var otp = new StringBuilder();
            for (int i = 0; i < lengthOTP; i++)
            {
                otp.Append(random.Next(0, 9));
            }
            return otp.ToString();
        }

        private void SendEmail(string toEmail, string otp)
        {
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("email@example.com", "email-password"),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress("myEamil"),
                Subject = "OTP",
                Body = $"Your OTP is: {otp}",
                IsBodyHtml = true,
            };
            mailMessage.To.Add(toEmail);
            smtpClient.Send(mailMessage);
        }
    }
}