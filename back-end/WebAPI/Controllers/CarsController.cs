using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DAO;
using WebAPI.DTO;
using WebAPI.Utils.AutoMapper;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> UserGetAllCars()
        {
            try
            {
                var cars = await CarsDAO.GetInstance().UserGetAllCars();
                if (cars == null || cars.Count == 0)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "No car found",
                        Success = false
                    });
                }
                var carDTOs = AutoMapper.ToCarDTOList(cars);
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Message = "Get all cars successfully",
                    Success = true,
                    Data = JsonSerializer.Serialize(carDTOs)
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
        public async Task<ActionResult> GetCarById(int id)
        {
            try
            {
                var car = await CarsDAO.GetInstance().GetCarById(id);
                if (car == null)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "Car not found",
                        Success = false
                    });
                }
                var carDTO = AutoMapper.ToCarDetailDTO(car);
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Message = "Get car by id successfully",
                    Success = true,
                    Data = JsonSerializer.Serialize(carDTO)
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

        [HttpGet("userGetCar/{id}")]
        public async Task<ActionResult> UserGetCarById(int id)
        {
            try
            {
                var car = await CarsDAO.GetInstance().UserGetCarById(id);
                if (car == null)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "Car not found",
                        Success = false
                    });
                }
                var carDTO = AutoMapper.ToCarDetailDTO(car);
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Message = "Get car by id successfully",
                    Success = true,
                    Data = JsonSerializer.Serialize(carDTO)
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

        [HttpGet("Color/{carId}")]
        public async Task<IActionResult> GetColorByCarId(int carId)
        {
            try
            {
                var car = await CarsDAO.GetInstance().UserGetCarById(carId);
                if (car == null)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "Car not found",
                        Success = false
                    });
                }

                var carColors = await CarsDAO.GetInstance().GetCarColorsByCarId(carId);
                if (carColors == null || carColors.Count == 0)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "No color found",
                        Success = false
                    });
                }
                var carColorDTOs = AutoMapper.ToCarColorDTOList(carColors);
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Message = "Get all colors by car id successfully",
                    Success = true,
                    Data = JsonSerializer.Serialize(carColorDTOs)
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