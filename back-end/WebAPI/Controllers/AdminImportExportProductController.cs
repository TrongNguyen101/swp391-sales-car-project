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
    public class AdminImportExportProductController : ControllerBase
    {
        [HttpGet("getAllImportExportProductHistory")]
        public async Task<ActionResult> AdminGetAllImportExportHistory()
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
                    Message = "Get all history successfully",
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