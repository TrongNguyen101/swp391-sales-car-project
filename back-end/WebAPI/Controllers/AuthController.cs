using Microsoft.AspNetCore.Mvc;
using WebAPI.DAO;
using WebAPI.Utils.EncyptHelper;
using WebAPI.Utils.AutoMapper;
using WebAPI.DTO;
using WebAPI.Utils.JwtTokenHelper;
using WebAPI.Models;
using System.Net.Mail;
using System.Net;
using System.Security.Cryptography;
using StackExchange.Redis;
using WebAPI.Utils.ResponseHelper;

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
        public async Task<IActionResult> ConfirmPassword([FromBody] LoginRequestDTO LoginRequest)
        {
            try
            {
                #region Authentication, Authorization
                var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
                // Check authentication and authorization of user based on the specified HTTP context and role that need to check for this function
                // If the user is not authenticated or authorized, return error message
                // If the user is authenticated and authorized, return claims of user
                // admin role id = 1
                // customer role id = 2
                var (isSuccess, errorMessage, claims) = JwtTokenHelper.AuthenticateAndAuthorize(HttpContext, 2);
                if (!isSuccess)
                {
                    // Return error message if the user is not authenticated or authorized
                    return Unauthorized(ResponseHelper.ResponseError(401, errorMessage ?? "Unknown error", false, null));
                }
                #endregion

                var userDAO = await UsersDAO.GetInstance().findUserByEmail(LoginRequest.Email);
                if (userDAO == null)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "User not found", false, null));

                }
                if (userDAO.Password != EncyptHelper.Sha256Encrypt(LoginRequest.Password))
                {
                    return Unauthorized(ResponseHelper.ResponseError(401, "Password is incorrect", false, null));
                }

                return Ok(ResponseHelper.ResponseSuccess(200, "Password is correct", true, null));
            }
            catch (Exception e)
            {
                Console.WriteLine("Error at ConfirmPassword function: ", e);
                return BadRequest(ResponseHelper.ResponseError(400, "Internal server error: Please contact support", false, null));
            }
        }


        [HttpPost("checkEmailExist")]
        public async Task<IActionResult> CheckEmailExist([FromBody] RequestCheckEmailDTO? registerRequest)
        {
            try
            {
                var userDAO = await UsersDAO.GetInstance().findUserByEmail(registerRequest.Email);
                if (userDAO == null)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "Email not found", false, null));
                }
                else
                {
                    return Ok(ResponseHelper.ResponseError(200, "Email is found", true, null));
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Error at CheckEmailExist function: ", e);
                return BadRequest(ResponseHelper.ResponseError(400, "Internal server error: Please contact support", false, null));
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
        public async Task<IActionResult> Register([FromBody] RegisterRequest RegisterRequest)
        {
            try
            {
                if (string.IsNullOrEmpty(RegisterRequest.Email) || string.IsNullOrEmpty(RegisterRequest.Password) || string.IsNullOrEmpty(RegisterRequest.Fullname) || string.IsNullOrEmpty(RegisterRequest.OTP))
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Email, password, fullname and OTP are required", false, null));
                }

                if (RegisterRequest.Password != RegisterRequest.RePassword)
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Passwords do not match", false, null));
                }

                if (await VerifyOTPCode(RegisterRequest.Email, RegisterRequest.OTP) == false)
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Invalid or expired OTP", false, null));
                }

                var newCustomer = new Users
                {
                    Id = Guid.NewGuid(),
                    UserName = RegisterRequest.Fullname,
                    Address = null,
                    Phone = RegisterRequest.Phone,
                    Email = RegisterRequest.Email,
                    Password = EncyptHelper.Sha256Encrypt(RegisterRequest.Password),
                    CreatedAt = DateTime.UtcNow,
                    IsDeleted = false,
                    LastChange = DateTime.UtcNow,
                    RoleId = 2
                };

                await UsersDAO.GetInstance().AddUser(newCustomer);

                return Ok(ResponseHelper.ResponseSuccess(200, "Register successfully", true, null));
            }
            catch (Exception e)
            {
                Console.WriteLine("Error at Register function: " + e);
                return BadRequest(ResponseHelper.ResponseError(400, "Internal server error: Please contact support", false, null));
            }
        }


        [HttpPost("createAccountStaff")]
        public async Task<IActionResult> CreateAccountStaff([FromBody] RegisterRequest RegisterRequest)
        {
            try
            {
                #region Authentication, Authorization
                var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
                // Check authentication and authorization of user based on the specified HTTP context and role that need to check for this function
                // If the user is not authenticated or authorized, return error message
                // If the user is authenticated and authorized, return claims of user
                // admin role id = 1
                // customer role id = 2
                var (isSuccess, errorMessage, claims) = JwtTokenHelper.AuthenticateAndAuthorize(HttpContext, 1);
                if (!isSuccess)
                {
                    // Return error message if the user is not authenticated or authorized
                    return Unauthorized(ResponseHelper.ResponseError(401, errorMessage ?? "Unknown error", false, null));
                }
                #endregion

                if (string.IsNullOrEmpty(RegisterRequest.Email) || string.IsNullOrEmpty(RegisterRequest.Password) || string.IsNullOrEmpty(RegisterRequest.Fullname) || string.IsNullOrEmpty(RegisterRequest.Phone))
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Email, password, fullname and phone are required", false, null));
                }

                if (RegisterRequest.Password != RegisterRequest.RePassword)
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Passwords do not match", false, null));
                }

                var newStaff = new Users
                {
                    Id = Guid.NewGuid(),
                    UserName = RegisterRequest.Fullname,
                    Address = null,
                    Phone = RegisterRequest.Phone,
                    Email = RegisterRequest.Email,
                    Password = EncyptHelper.Sha256Encrypt(RegisterRequest.Password),
                    CreatedAt = DateTime.UtcNow,
                    IsDeleted = false,
                    LastChange = DateTime.UtcNow,
                    RoleId = 3
                };

                await UsersDAO.GetInstance().AddUser(newStaff);

                return Ok(ResponseHelper.ResponseSuccess(200, "Register successfully", true, null));
            }
            catch (Exception e)
            {
                Console.WriteLine("Error at Register function: " + e);
                return BadRequest(ResponseHelper.ResponseError(400, "Internal server error: Please contact support", false, null));
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
        /// <item><description>400 Bad Request: If an exception occurs during the process.</description></item>
        /// </list>
        /// </returns>
        [HttpPost("SendOTP")]
        public async Task<IActionResult> SendOTP([FromBody] RequestCheckEmailDTO request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.Email))
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Email is required", false, null));
                }
                // please code again just for runnning
                string storedOtp = await _cache.StringGetAsync(request.Email);

                if (!string.IsNullOrEmpty(storedOtp))
                {
                    await _cache.KeyDeleteAsync(request.Email); // Delete existing OTP before sending a new one
                }

                var otpCode = GenerateOTP();
                await _cache.StringSetAsync(request.Email, otpCode, TimeSpan.FromMinutes(5));
                bool isSentEmail = await SendEmail(request.Email, otpCode);
                if (isSentEmail)
                {
                    return Ok(ResponseHelper.ResponseSuccess(200, "Send OTP successfully", true, null));
                }
                else
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Failed to send OTP. Please try again.", false, null));
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Error at SendOTP fuction: " + e);
                return BadRequest(ResponseHelper.ResponseError(400, "Internal server error: Please contact support", false, null));
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
                    return BadRequest(ResponseHelper.ResponseError(400, "Email and OTP are required", false, null));
                }

                bool isVerified = await VerifyOTPCode(request.Email, request.OTP);
                if (isVerified)
                {
                    return Ok(ResponseHelper.ResponseSuccess(200, "OTP verified successfully", true, null));
                }
                else
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Invalid or expired OTP", false, null));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error at VerifyOTP function: " + ex);
                return BadRequest(ResponseHelper.ResponseError(400, "Internal server error: Please contact support", false, null));
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
                if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password) || string.IsNullOrEmpty(request.RePassword) || string.IsNullOrEmpty(request.OTP))
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Email, password, re-password and OTP are required", false, null));
                }

                if (request.Password != request.RePassword)
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Passwords do not match", false, null));
                }

                if (await VerifyOTPCode(request.Email, request.OTP) == false)
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Invalid or expired OTP", false, null));
                }

                if (await UsersDAO.GetInstance().ResetPassword(request))
                {
                    await _cache.KeyDeleteAsync(request.Email); // Delete existing OTP after update password
                    return Ok(ResponseHelper.ResponseSuccess(200, "Password reset successfully", true, null));
                }
                else
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Failed to reset password. Please try again.", false, null));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error at ResetPassword function: " + ex);
                return BadRequest(ResponseHelper.ResponseError(400, "Internal server error: Please contact support", false, null));
            }
        }
    }
}