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
                var (isSuccess, errorMessage, claims) = JwtTokenHelper.AuthenticateAndAuthorize(HttpContext, 1, 2, 3);
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

        [HttpGet("getCurrentManagerProfile")]
        public async Task<ActionResult> GetCurrentManagerProfile()
        {
            try
            {
                #region Authentication, Authorization
                // Check authentication and authorization of user based on the specified HTTP context and role that need to check for this function
                // If the user is not authenticated or authorized, return error message
                // If the user is authenticated and authorized, return claims of user
                // admin role id = 1
                // customer role id = 2
                // staff role id = 3
                var (isSuccess, errorMessage, claims) = JwtTokenHelper.AuthenticateAndAuthorize(HttpContext, 1, 3);
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


        [HttpGet("adminGetAllUsers")]
        public async Task<IActionResult> AdminGetAllUsers()
        {
            try
            {
                #region Authentication, Authorization
                // Check authentication and authorization of user based on the specified HTTP context and role that need to check for this function
                // If the user is not authenticated or authorized, return error message
                // If the user is authenticated and authorized, return claims of user
                // admin role id = 1
                // customer role id = 2
                // staff role id = 3
                var (isSuccess, errorMessage, claims) = JwtTokenHelper.AuthenticateAndAuthorize(HttpContext, 1, 3);
                if (!isSuccess)
                {
                    // Return error message if the user is not authenticated or authorized
                    return Unauthorized(ResponseHelper.ResponseError(401, errorMessage ?? "Unknown error", false, null));
                }
                #endregion
                var users = await UsersDAO.GetInstance().GetAllUsersAsync();
                if (users == null || users.Count == 0)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "No user found", false, null));
                }
                var usersListDTO = AutoMapper.ToUserDTOList(users);
                return Ok(ResponseHelper.ResponseSuccess(200, "Get all users successfully", true, usersListDTO));
            }
            catch (Exception e)
            {
                Console.WriteLine("Fail to get all users. Error: ", e);
                return BadRequest(ResponseHelper.ResponseError(400, "Internal server error.", false, null));
            }
        }

        [HttpGet("adminGetAllStaffs")]
        public async Task<IActionResult> AdminGetAllStaffs()
        {
            try
            {
                #region Authentication, Authorization
                // Check authentication and authorization of user based on the specified HTTP context and role that need to check for this function
                // If the user is not authenticated or authorized, return error message
                // If the user is authenticated and authorized, return claims of user
                // admin role id = 1
                // customer role id = 2
                // staff role id = 3
                var (isSuccess, errorMessage, claims) = JwtTokenHelper.AuthenticateAndAuthorize(HttpContext, 1);
                if (!isSuccess)
                {
                    // Return error message if the user is not authenticated or authorized
                    return Unauthorized(ResponseHelper.ResponseError(401, errorMessage ?? "Unknown error", false, null));
                }
                #endregion
                var staffs = await UsersDAO.GetInstance().GetAllStaffsAsync();
                if (staffs == null || staffs.Count == 0)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "No staff found", false, null));
                }
                var staffListDTO = AutoMapper.ToUserDTOList(staffs);
                return Ok(ResponseHelper.ResponseSuccess(200, "Get all users successfully", true, staffListDTO));
            }
            catch (Exception e)
            {
                Console.WriteLine("Fail to get all staff. Error: ", e);
                return BadRequest(ResponseHelper.ResponseError(400, "Internal server error.", false, null));
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

        [HttpPut("updateUserInformation/{userId}")]
        public async Task<IActionResult> UpdateUserInformation(Guid userId, UpdateUserDTO userData)
        {
            try
            {
                #region Authentication, Authorization
                // Check authentication and authorization of user based on the specified HTTP context and role that need to check for this function
                // If the user is not authenticated or authorized, return error message
                // If the user is authenticated and authorized, return claims of user
                // admin role id = 1
                // customer role id = 2
                // staff role id = 3
                var (isSuccess, errorMessage, claims) = JwtTokenHelper.AuthenticateAndAuthorize(HttpContext, 1, 3);
                if (!isSuccess)
                {
                    // Return error message if the user is not authenticated or authorized
                    return Unauthorized(ResponseHelper.ResponseError(401, errorMessage ?? "Unknown error", false, null));
                }
                #endregion

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

        [HttpPut("adminUpdateStaffInformation/{userId}")]
        public async Task<IActionResult> AdminUpdateStaffInformation(Guid userId, UpdateUserDTO userData)
        {
            try
            {
                #region Authentication, Authorization
                // Check authentication and authorization of user based on the specified HTTP context and role that need to check for this function
                // If the user is not authenticated or authorized, return error message
                // If the user is authenticated and authorized, return claims of user
                // admin role id = 1
                // customer role id = 2
                // staff role id = 3
                var (isSuccess, errorMessage, claims) = JwtTokenHelper.AuthenticateAndAuthorize(HttpContext, 1);
                if (!isSuccess)
                {
                    // Return error message if the user is not authenticated or authorized
                    return Unauthorized(ResponseHelper.ResponseError(401, errorMessage ?? "Unknown error", false, null));
                }
                #endregion

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

        [HttpDelete("adminDeleteStaff/{userId}")]
        public async Task<IActionResult> AdminDeleteStaff(Guid userId)
        {
            try
            {
                #region Authentication, Authorization
                // Check authentication and authorization of user based on the specified HTTP context and role that need to check for this function
                // If the user is not authenticated or authorized, return error message
                // If the user is authenticated and authorized, return claims of user
                // admin role id = 1
                // customer role id = 2
                // staff role id = 3
                var (isSuccess, errorMessage, claims) = JwtTokenHelper.AuthenticateAndAuthorize(HttpContext, 1);
                if (!isSuccess)
                {
                    // Return error message if the user is not authenticated or authorized
                    return Unauthorized(ResponseHelper.ResponseError(401, errorMessage ?? "Unknown error", false, null));
                }
                #endregion

                var staffseletedToDelete = await UsersDAO.GetInstance().FindUserById(userId.ToString());
                if (staffseletedToDelete == null)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "User not found", false, null));
                }

                staffseletedToDelete.IsDeleted = true;
                staffseletedToDelete.LastChange = DateTime.Now;

                await UsersDAO.GetInstance().DeleteUser(staffseletedToDelete);
                return Ok(ResponseHelper.ResponseSuccess(200, "Delete staff successfully", true, null));
            }
            catch (Exception e)
            {
                Console.WriteLine("Error at delete staff: ", e);
                return BadRequest(ResponseHelper.ResponseError(400, "Internal server error", false, null));
            }
        }

        [HttpPut("adminRestoreStaff/{userId}")]
        public async Task<IActionResult> AdminRestoreStaff(Guid userId)
        {
            try
            {
                #region Authentication, Authorization
                // Check authentication and authorization of user based on the specified HTTP context and role that need to check for this function
                // If the user is not authenticated or authorized, return error message
                // If the user is authenticated and authorized, return claims of user
                // admin role id = 1
                // customer role id = 2
                // staff role id = 3
                var (isSuccess, errorMessage, claims) = JwtTokenHelper.AuthenticateAndAuthorize(HttpContext, 1);
                if (!isSuccess)
                {
                    // Return error message if the user is not authenticated or authorized
                    return Unauthorized(ResponseHelper.ResponseError(401, errorMessage ?? "Unknown error", false, null));
                }
                #endregion

                var staffseletedToDelete = await UsersDAO.GetInstance().FindUserById(userId.ToString());
                if (staffseletedToDelete == null)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "User not found", false, null));
                }

                staffseletedToDelete.IsDeleted = false;
                staffseletedToDelete.LastChange = DateTime.Now;

                await UsersDAO.GetInstance().UpdateUser(staffseletedToDelete);
                return Ok(ResponseHelper.ResponseSuccess(200, "Restore staff successfully", true, null));
            }
            catch (Exception e)
            {
                Console.WriteLine("Error at delete staff: ", e);
                return BadRequest(ResponseHelper.ResponseError(400, "Internal server error", false, null));
            }
        }

        [HttpPut("userUpdateInformation")]
        public async Task<IActionResult> UserUpdateInformation(UpdateUserDTO userData)
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