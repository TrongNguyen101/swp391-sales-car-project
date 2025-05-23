using Microsoft.AspNetCore.Mvc;
using WebAPI.DAO;
using WebAPI.DTO;
using WebAPI.Utils.AutoMapper;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> GetAllCategories()
        {
            try
            {
                var categories = await CategoryDAO.GetInstance().GetAllCategories();
                if (!categories.Any())
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "No categories found",
                        Success = false
                    });
                }
                var cateroriesDTO = AutoMapper.ToCategoryDTOList(categories);
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Message = "Get all categories successfully",
                    Success = true,
                    Data = cateroriesDTO
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
        public async Task<ActionResult> GetCategoryById(int id)
        {
            try
            {
                var category = await CategoryDAO.GetInstance().GetCategoryById(id);
                if (category == null)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "Category not found",
                        Success = false
                    });
                }
                var categoryDTO = AutoMapper.ToCategoryDTO(category);
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Message = "Get category by id successfully",
                    Success = true,
                    Data = categoryDTO
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