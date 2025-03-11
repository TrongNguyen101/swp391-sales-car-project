using Microsoft.AspNetCore.Mvc;
using WebAPI.DAO;
using WebAPI.DTO;
using WebAPI.Utils.AutoMapper;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController :ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAllUser()
        {
            try
            {
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
    }
}