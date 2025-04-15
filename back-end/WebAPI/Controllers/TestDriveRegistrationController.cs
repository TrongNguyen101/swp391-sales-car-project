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


                var car = await CarsDAO.GetInstance().GetCarById(dto.CarId);

                if (car == null)
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Message = "Car not found",
                        Success = false
                    });
                }

                dto.CarName = car.Name;

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

        [HttpPut("updateStatus/{idTestRegister}")]
        public async Task<ActionResult> RegisterTestDrive(int idTestRegister, [FromBody] TestDriveRegistrationDTO dto)
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

                var testDrive = await TestDriveRegistrationDAO.GetInstance().GetTestDriveRegisterById(idTestRegister);

                if (testDrive == null)
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Message = "Test drive not found",
                        Success = false
                    });
                }

                var car = await CarsDAO.GetInstance().GetCarByName(dto.CarName);

                if (car == null)
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Message = "Car not found",
                        Success = false
                    });
                }

                testDrive.CarId = car.Id;
                testDrive.CarName = dto.CarName;
                testDrive.Status = dto.Status;

                bool isSuccess = await TestDriveRegistrationDAO.GetInstance().UpdateRegisterTestDrive(testDrive);

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

        [HttpGet]
        public async Task<ActionResult> GetAllRegisterTestDrive()
        {
            try
            {
                var testDriveRegistration = await TestDriveRegistrationDAO.GetInstance().GetAllTestDrivenRegisters();
                if (!testDriveRegistration.Any())
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "No accessory found",
                        Success = false
                    });
                }

                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Message = "Get all accessories successfully",
                    Success = true,
                    Data = testDriveRegistration
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
