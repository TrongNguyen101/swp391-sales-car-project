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
        private readonly Dictionary<string, OTPCode> otpCodeStorage = new Dictionary<string, OTPCode>();

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
                var otpCode = GenerateOTP();
                otpCodeStorage[request.Email] = new OTPCode
                {
                    OTP = otpCode,
                    CreateAt = DateTime.UtcNow,
                };
                SendEmail(request.Email, otpCode);
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Success = true,
                    Message = "Send OTP successfully",
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
        [HttpPost("VeryfyOTP")]
        public async Task<IActionResult> VeryfyOTP([FromBody] RequestVerifyOTP request)
        {
            try
            {
                var verification = VerifyOTPCode(request.Email, request.OTP);
               if (verification != "")
                {
                    return Ok(new DataResponse
                    {
                        StatusCode = 200,
                        Success = true,
                        Message = "OTP verified successfully",
                        Data = verification
                    });
                }
                else
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Success = false,
                        Message = "Invalid or expired OTP",
                        Data = verification
                    });
                }
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
                UseDefaultCredentials = false,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Credentials = new NetworkCredential("tronglion9@gmail.com", "zwlh htyu xegp unwd"),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress("tronglion9@gmail.com"),
                Subject = "OTP",
                Body = $@"
                <html>
                 <head>
                    <style>
                        body {{
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            color: #333333;
                            margin: 0;
                            padding: 0;
                        }}
                        .container {{
                            max-width: 600px;
                            margin: 0 auto;
                            background: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }}
                        h1 {{
                            font-size: 24px;
                            color: #333333;
                        }}
                        p {{
                            font-size: 16px;
                            line-height: 1.5;
                            color: #555555;
                        }}
                        strong {{
                            font-size: 18px;
                            color: #000000;
                        }}
                        .footer {{
                            margin-top: 20px;
                            padding-top: 10px;
                            border-top: 1px solid #dddddd;
                            font-size: 14px;
                            color: #777777;
                        }}
                        .footer p {{
                            margin: 5px 0;
                        }}
                    </style>
                </head>
                <body>
                    <p>Hi,</p>
                    <p>We have received a request for an OTP from your account. Please use the OTP below to proceed with verification:</p>
                    <p>🔑 <strong>Your OTP Code: {otp}</strong></p>
                    <p>This code is valid for 5 minutes and can only be used once. Do not share this code with anyone.</p>
                    <p>If you did not request this OTP, please check your account security and contact us for assistance.</p>
                    <p>📞 Hotline: 1900 23 23 89</p>
                    <p>📧 Support Email: Suport.Vinfast@gmail.com</p>
                    <p>Best regards,</p>
                    <p>VinFast Support Team</p>
                </body>
                </html>",
                IsBodyHtml = true,
            };
            mailMessage.To.Add(toEmail);
            smtpClient.Send(mailMessage);
        }
        private object VerifyOTPCode(string email, string otp)
        {
            var otpStorage = otpCodeStorage.TryGetValue(email, out OTPCode otpEntry);
            if (!otpStorage)
            {
                return otpEntry;
            }
            Console.Write($"OTP verified: {otpStorage}");
            otpCodeStorage.Remove(email);
            return "a";
        }
    }
}