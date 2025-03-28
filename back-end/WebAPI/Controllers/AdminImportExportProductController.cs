using Microsoft.AspNetCore.Mvc;
using WebAPI.DAO;
using WebAPI.DTO;
using WebAPI.Utils.AutoMapper;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminImportExportProductController : ControllerBase
    {
        [HttpGet("getAllImportExportProductHistory")]
        public async Task<ActionResult> AdminGetAllImportExportHistory()
        {
            try
            {
                var listImportExportHistories = await TransactionsDAO.GetInstance().GetAllImportExportHistories();

                if (listImportExportHistories == null || listImportExportHistories.Count == 0)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "No import export history found",
                        Success = false
                    });
                }
                    
                var listImportExportHistoryDTO = AutoMapper.ToImportExportHistoryDTOList(listImportExportHistories);
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Message = "Get all accessorys successfully",
                    Success = true,
                    Data = listImportExportHistoryDTO
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