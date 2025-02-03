using Microsoft.AspNetCore.Mvc;
using WebAPI.DAO;
using WebAPI.Models;
using WebAPI.Utils.AutoMapper;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> GetAllCars()
        {
            var cars = await CarsDAO.GetInstance().GetAllCars();
            var carDTOs = AutoMapper.ToCarDTOList(cars);
            return Ok(carDTOs);
        }
    }
}