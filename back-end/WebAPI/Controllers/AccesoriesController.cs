using Microsoft.AspNetCore.Mvc;
using WebAPI.DAO;
using WebAPI.DTO;
using WebAPI.Utils.AutoMapper;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccessoriesController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> GetAllAccessories()
        {
            try
            {
                var accessories = await AccessoriesDAO.GetInstance().GetAllAccessories();
                if (!accessories.Any())
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "No accessory found",
                        Success = false
                    });
                }
                var accessoryDTOs = AutoMapper.ToAccessoryDTOList(accessories);
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Message = "Get all accessories successfully",
                    Success = true,
                    Data = accessoryDTOs
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new DataResponse
                {
                    StatusCode = 400,
                    Message = ex.Message,
                    Success = false
                });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetAccessoryById(int id)
        {
            try
            {
                var accessory = await AccessoriesDAO.GetInstance().GetAccessoryById(id);
                if (accessory == null)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "Accessory not found",
                        Success = false
                    });
                }
                var accessoryDTO = AutoMapper.ToAccessoryDTO(accessory);
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Message = "Get accessory by id successfully",
                    Success = true,
                    Data = accessoryDTO
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new DataResponse
                {
                    StatusCode = 400,
                    Message = ex.Message,
                    Success = false
                });
            }
        }
    }
}