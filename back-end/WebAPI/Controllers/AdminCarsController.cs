using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DAO;
using WebAPI.DTO;
using WebAPI.Utils.AutoMapper;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminCarsController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> AdminGetAllCars()
        {
            try
            {
                var adminCars = await CarsDAO.GetInstance().GetAllCars();
                if (adminCars == null || adminCars.Count == 0)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "No car found",
                        Success = false
                    });
                }
                var admincCarDTOs = AutoMapper.ToAdminCarDTOList(adminCars);
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Message = "Get all cars successfully",
                    Success = true,
                    Data = admincCarDTOs
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
        public async Task<ActionResult> AdminGetCarById(int id)
        {
            try
            {
                var adminCar = await CarsDAO.GetInstance().GetCarById(id);
                if (adminCar == null)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "Car not found",
                        Success = false
                    });
                }
                var adminCarDTO = AutoMapper.ToAdminCarDTO(adminCar);
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Message = "Get car by id successfully",
                    Success = true,
                    Data = adminCarDTO
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

        [HttpGet("Color/{adminCarId}")]
        public async Task<IActionResult> AdminGetColorByCarId(int adminCarId)
        {
            try
            {
                // Admin gets all car colors by car id
                var adminCarColors = await CarsDAO.GetInstance().GetCarColorsByCarId(adminCarId);
                if (adminCarColors == null || adminCarColors.Count == 0)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "No color found",
                        Success = false
                    });
                }
                // Convert list of CarColor to list of AdminCarColorDTO
                var adminCarColorDTOs = AutoMapper.ToAdminCarColorDTOList(adminCarColors);
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Message = "Get all colors by car id successfully",
                    Success = true,
                    Data = adminCarColorDTOs
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

        [HttpPut("delete/{adminCarId}")]
        public async Task<IActionResult> AdminDeleteByCarId(int adminCarId)
        {
            try
            {
                var adminCar = await CarsDAO.GetInstance().GetCarById(adminCarId);
                if (adminCar == null)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "Car not found",
                        Success = false
                    });
                }

                adminCar.IsDeleted = true;
                Console.WriteLine(adminCar);
                if (await CarsDAO.GetInstance().DeleteCarById(adminCar))

                {
                    return Ok(new DataResponse
                    {
                        StatusCode = 200,
                        Message = "Car deleted successfully",
                        Success = true
                    });
                }
                else
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Message = "Delete car failed",
                        Success = false
                    });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new DataResponse
                {
                    StatusCode = 400,
                    Message = "Internal server error. Please contact support.",
                    Success = false
                });
            }
        }
    }
}