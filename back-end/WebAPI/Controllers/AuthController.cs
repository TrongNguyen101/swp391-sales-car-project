using Microsoft.AspNetCore.Mvc;
using WebAPI.DAO;
using WebAPI.Utils.EncyptHelper;
using WebAPI.Utils.AutoMapper;
using WebAPI.DTO;
using Microsoft.AspNetCore.Authorization;
using WebAPI.Utils.JwtTokenHelper;
using WebAPI.Models;
using System.Net.Mail;
using System.Net;
using System.Collections.Concurrent;
using System.Security.Cryptography;
using StackExchange.Redis;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IDatabase _cache;

        public AuthController(IDatabase cache)
        {
            _cache = cache;
        }


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

        [HttpPost("ConfirmPassword")]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmPassword([FromBody] LoginRequestDTO LoginRequest)
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
                        Message = "Email or password is incorrect",
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
                // please code again just for runnning
                string storedOtp = await _cache.StringGetAsync(LoginRequest.Email);

                if (!string.IsNullOrEmpty(storedOtp))
                {
                    await _cache.KeyDeleteAsync(LoginRequest.Email); // Delete existing OTP before sending a new one
                }

                var otpCode = GenerateOTP();
                await _cache.StringSetAsync(LoginRequest.Email, otpCode, TimeSpan.FromMinutes(5));
                bool isSentEmail = await SendEmail(LoginRequest.Email, otpCode);
                if (isSentEmail)
                {
                    return Ok(new DataResponse
                    {
                        StatusCode = 200,
                        Success = true,
                        Message = "Send OTP successfully",
                    });
                }
                else
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Success = false,
                        Message = "Recent password is incorrect",
                    });
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(new DataResponse
                {
                    StatusCode = 400,
                    Success = false,
                    Message = "Internal server error. Please contact support for changing password.",
                });
            }
        }


        [HttpPost("checkEmailExist")]
        [AllowAnonymous]
        public async Task<IActionResult> CheckEmailExist([FromBody] RegisterRequest? registerRequest)
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
                // please code again just for runnning
                string storedOtp = await _cache.StringGetAsync(registerRequest.Email);

                if (!string.IsNullOrEmpty(storedOtp))
                {
                    await _cache.KeyDeleteAsync(registerRequest.Email); // Delete existing OTP before sending a new one
                }

                var otpCode = GenerateOTP();
                await _cache.StringSetAsync(registerRequest.Email, otpCode, TimeSpan.FromMinutes(5));
                bool isSentEmail = await SendEmail(registerRequest.Email, otpCode);
                if (isSentEmail)
                {
                    return Ok(new DataResponse
                    {
                        StatusCode = 200,
                        Success = true,
                        Message = "Send OTP for new user successfully",
                    });
                }
                else
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Success = false,
                        Message = "Failed to send OTP for new user. Please try again.",
                    });
                }
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
                if (string.IsNullOrEmpty(RegisterRequest.Email) || string.IsNullOrEmpty(RegisterRequest.Password) || string.IsNullOrEmpty(RegisterRequest.Fullname) || string.IsNullOrEmpty(RegisterRequest.OTP))
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Success = false,
                        Message = "Email, password fullname and OTP are required",
                    });
                }

                if (RegisterRequest.Password != RegisterRequest.RePassword)
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Success = false,
                        Message = "Passwords do not match",
                    });
                }
                
                if (await VerifyOTPCode(RegisterRequest.Email, RegisterRequest.OTP) == false)
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Success = false,
                        Message = "Invalid or expired OTP",
                    });
                }

                var userDAO = new Users
                {
                    Id = Guid.NewGuid(),
                    UserName = RegisterRequest.Fullname.ToLower(),
                    Address = null,
                    Phone = RegisterRequest.Phone,
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
                if (string.IsNullOrEmpty(request.Email))
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Success = false,
                        Message = "Email is required",
                    });
                }
                // please code again just for runnning
                string storedOtp = await _cache.StringGetAsync(request.Email);

                if (!string.IsNullOrEmpty(storedOtp))
                {
                    await _cache.KeyDeleteAsync(request.Email); // Delete existing OTP before sending a new one
                }

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
                await _cache.StringSetAsync(request.Email, otpCode, TimeSpan.FromMinutes(5));
                bool isSentEmail = await SendEmail(request.Email, otpCode);
                if (isSentEmail)
                {
                    return Ok(new DataResponse
                    {
                        StatusCode = 200,
                        Success = true,
                        Message = "Send OTP successfully",
                    });
                }
                else
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Success = false,
                        Message = "Failed to send OTP. Please try again.",
                    });
                }
            }
            catch (Exception e)
            {
                return BadRequest(new DataResponse
                {
                    StatusCode = 500,
                    Success = false,
                    Message = "Internal server error. Please contact support.",
                });
            }
        }

        private string GenerateOTP()
        {
            using var rng = RandomNumberGenerator.Create();
            byte[] bytes = new byte[4];
            rng.GetBytes(bytes);
            int otp = (int)(Math.Abs(BitConverter.ToUInt32(bytes, 0)) % 1000000);
            return otp.ToString("D6");
        }

        [HttpPost("VerifyOTP")]
        public async Task<IActionResult> VerifyOTP([FromBody] RequestVerifyOTP request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.OTP))
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Success = false,
                        Message = "Email and OTP are required",
                    });
                }

                bool isVerified = await VerifyOTPCode(request.Email, request.OTP);
                if (isVerified)
                {
                    return Ok(new DataResponse
                    {
                        StatusCode = 200,
                        Success = true,
                        Message = "OTP verified successfully",
                    });
                }
                else
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Success = false,
                        Message = "Invalid or expired OTP",
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

        private async Task<bool> VerifyOTPCode(string email, string otp)
        {
            // Check if OTP exists and get remaining TTL
            TimeSpan? timeToLive = await _cache.KeyTimeToLiveAsync(email);

            if (!timeToLive.HasValue)
            {
                return false; // OTP expired or does not exist
            }

            string storedOtp = await _cache.StringGetAsync(email);

            if (storedOtp == otp)
            {
                return true; // OTP verified successfully
            }

            return false; // Invalid OTP
        }

        private async Task<bool> SendEmail(string toEmail, string otp)
        {
            try
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

                await smtpClient.SendMailAsync(mailMessage);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ChangePasswordRequestDTO request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Success = false,
                        Message = "Email and new password are required",
                    });
                }

                if (request.Password != request.rePassword)
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Success = false,
                        Message = "Passwords do not match",
                    });
                }

                if (await VerifyOTPCode(request.Email, request.OTP) == false)
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Success = false,
                        Message = "Invalid or expired OTP",
                    });
                }

                if (await UsersDAO.GetInstance().ResetPassword(request))
                {
                    await _cache.KeyDeleteAsync(request.Email); // Delete existing OTP after update password
                    return Ok(new DataResponse
                    {
                        StatusCode = 200,
                        Success = true,
                        Message = "Password changed successfully",
                    });
                }
                else
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Success = false,
                        Message = "Failed to reset password. Please try again.",
                    });
                }


            }
            catch (Exception)
            {
                return BadRequest(new DataResponse
                {
                    StatusCode = 400,
                    Success = false,
                    Message = "Internal server error. Please contact support."
                });
            }
        }
    }
}