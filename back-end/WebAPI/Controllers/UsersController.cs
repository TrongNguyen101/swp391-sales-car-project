using System.Security;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DAO;
using WebAPI.DTO;
using WebAPI.Utils.AutoMapper;
using WebAPI.Utils.JwtTokenHelper;
using WebAPI.Utils.ResponseHelper;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {


        [HttpGet("currentUserProfile")]
        public async Task<ActionResult> GetCurrentUserProfile()
        {
            try
            {
                var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
                #region Authentication, Authorization
                // Check authentication and authorization of user based on the specified HTTP context and role that need to check for this function
                // If the user is not authenticated or authorized, return error message
                // If the user is authenticated and authorized, return claims of user
                // admin role id = 1
                // customer role id = 2
                var (isSuccess, errorMessage, claims) = JwtTokenHelper.AuthenticateAndAuthorize(HttpContext, 1, 2);
                if (!isSuccess)
                {
                    // Return error message if the user is not authenticated or authorized
                    return Unauthorized(ResponseHelper.ResponseError(401, errorMessage ?? "Unknown error", false, null));
                }
                #endregion

                var userId = claims["sub"].ToString();

                var user = await UsersDAO.GetInstance().FindUserById(userId);
                if (user == null)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "User not found", false, null));
                }

                var userDTO = AutoMapper.ToUserDTO(user);
                return Ok(ResponseHelper.ResponseSuccess(200, "Get user profile successfully", true, userDTO));
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error at get user profile: ", ex);
                return BadRequest(ResponseHelper.ResponseError(400, "An error occurred while retrieving the user profile", false, null));
            }
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult> GetUserProfileById(string userId)
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

                var user = await UsersDAO.GetInstance().FindUserById(userId);
                if (user == null)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "User not found", false, null));
                }

                var userDTO = AutoMapper.ToUserDTO(user);
                return Ok(ResponseHelper.ResponseSuccess(200, "Get user profile successfully", true, userDTO));
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error at get user profile: ", ex);
                return BadRequest(ResponseHelper.ResponseError(400, "An error occurred while retrieving the user profile", false, null));
            }
        }


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
                var user = UsersDAO.GetInstance().FindUserById(userData.UserId.ToString());
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

        [HttpPut("Edit/{userId}")]
        public async Task<IActionResult> EditUser(Guid userId, [FromBody] UserDTO userData)
        {
            try
            {
                var user = await UsersDAO.GetInstance().FindUserById(userId.ToString());
                if (user == null)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "User not found",
                        Success = false
                    });
                }
                user.UserName = userData.UserName;
                user.Address = userData.Address;
                user.Phone = userData.Phone;
                user.LastChange = DateTime.Now;
                await UsersDAO.GetInstance().UpdateUser(user);
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

        [HttpGet("Search/{email}")]
        public async Task<IActionResult> SearchUser(string email)
        {
            try
            {
                var user = await UsersDAO.GetInstance().findUserByEmail(email);
                if (user == null)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "User not found",
                        Success = false
                    });
                }
                var userDTO = AutoMapper.ToUserDTO(user);
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Message = "Search user successfully",
                    Success = true,
                    Data = userDTO
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

        [HttpPut("Update/{userId}")]
        public async Task<IActionResult> UpdateUser(Guid userId, UpdateUserDTO userData)
        {
            try
            {
                var user = await UsersDAO.GetInstance().FindUserById(userId.ToString());
                if (user == null)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "User not found", false, null));
                }
                user.UserName = userData.UserName;
                user.Address = userData.Address;
                user.Phone = userData.Phone;
                user.LastChange = DateTime.Now;
                await UsersDAO.GetInstance().UpdateUser(user);
                return Ok(ResponseHelper.ResponseSuccess(200, "Update user successfully", true, null));
            }
            catch (Exception e)
            {
                Console.WriteLine("Error at update user: ", e);
                return BadRequest(ResponseHelper.ResponseError(400, e.Message, false, null));
            }
        }

        [HttpPut("userUpdateInformation")]
        public async Task<IActionResult> UserUpdateInformation( UpdateUserDTO userData)
        {
            try
            {
                var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
                #region Authentication, Authorization
                // Check authentication and authorization of user based on the specified HTTP context and role that need to check for this function
                // If the user is not authenticated or authorized, return error message
                // If the user is authenticated and authorized, return claims of user
                // admin role id = 1
                // customer role id = 2
                var (isSuccess, errorMessage, claims) = JwtTokenHelper.AuthenticateAndAuthorize(HttpContext, 1, 2);
                if (!isSuccess)
                {
                    // Return error message if the user is not authenticated or authorized
                    return Unauthorized(ResponseHelper.ResponseError(401, errorMessage ?? "Unknown error", false, null));
                }
                #endregion

                var userId = claims["sub"].ToString();

                var user = await UsersDAO.GetInstance().FindUserById(userId.ToString());
                if (user == null)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "User not found", false, null));
                }
                user.UserName = userData.UserName;
                user.Address = userData.Address;
                user.Phone = userData.Phone;
                user.LastChange = DateTime.Now;
                await UsersDAO.GetInstance().UpdateUser(user);
                return Ok(ResponseHelper.ResponseSuccess(200, "Update user successfully", true, null));
            }
            catch (Exception e)
            {
                Console.WriteLine("Error at update user: ", e);
                return BadRequest(ResponseHelper.ResponseError(400, e.Message, false, null));
            }
        }
    }
}