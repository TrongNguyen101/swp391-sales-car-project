using Microsoft.AspNetCore.Mvc;
using WebAPI.DAO;
using WebAPI.DTO;
using WebAPI.Models;
using WebAPI.Utils.AutoMapper;
using System.Text.Json;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestDriveRegistrationController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> RegisterTestDrive([FromBody] TestDriveRegistrationDTO dto)
        {
            try
            {
                if (dto == null)
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Message = "Invalid request data",
                        Success = false
                    });
                }

                var testDrive = AutoMapper.ToTestDriveRegistration(dto);

                bool isSuccess = await TestDriveRegistrationDAO.GetInstance().RegisterTestDrive(testDrive);

                if (!isSuccess)
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Message = "Failed to register test drive",
                        Success = false
                    });
                }

                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Message = "Test drive registered successfully",
                    Success = true,
                    Data = JsonSerializer.Serialize(dto)
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
