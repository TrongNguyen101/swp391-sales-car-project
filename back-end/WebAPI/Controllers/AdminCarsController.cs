using Microsoft.AspNetCore.Mvc;
using WebAPI.DAO;
using WebAPI.DTO;
using WebAPI.Models;
using WebAPI.Utils.AutoMapper;
using WebAPI.Utils.JwtTokenHelper;
using WebAPI.Utils.ResponseHelper;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminCarsController : ControllerBase
    {

        private readonly string _uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "Images/CarImages");
        private readonly string _uploadPathforBigColorImageCar = Path.Combine(Directory.GetCurrentDirectory(), "Images/CarColorDetail");
        private readonly string _uploadPathforSmallColorImageCar = Path.Combine(Directory.GetCurrentDirectory(), "Images/CarColor");



        public AdminCarsController()
        {
            if (!Directory.Exists(_uploadPath))
                Directory.CreateDirectory(_uploadPath);
        }

        private static readonly string[] AllowedExtensions = { ".jpg", ".jpeg", ".png", ".gif" };
        private const long MaxFileSize = 5 * 1024 * 1024; // 5MB

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

        [HttpPut("adminAddMoreCar/{id}")]
        public async Task<IActionResult> AdminAddMoreCar(int id, [FromBody] AdminAddMoreCarDTO adminAddMoreCarDTO)
        {
            try
            {
                #region Authentication, Authorization
                // Get token
                var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

                // Check token
                if (authorizationHeader == null || !authorizationHeader.StartsWith("Bearer "))
                {
                    return Unauthorized(ResponseHelper.Response(401, "Authentication token is missing or invalid", false, null));
                }
                // Format token
                var token = authorizationHeader.Split(" ")[1];
                // Get claims
                var claims = JwtTokenHelper.GetUserClaims(token);
                // Verify token
                if (claims == null)
                {
                    return Unauthorized(ResponseHelper.Response(401, "Authentication token is invalid", false, null));
                }
                // Check role
                if (claims.TryGetValue("role", out var roleId) && roleId.ToString() != "1")
                {
                    return Unauthorized(ResponseHelper.Response(401, "Unauthorized access denied", false, null));
                }
                #endregion

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

                adminCar.Quantity = adminCar.Quantity + adminAddMoreCarDTO.Quantity;

                Console.WriteLine(adminCar);
                if (await CarsDAO.GetInstance().AdminAddMoreCar(adminCar))

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
        [HttpPost("adminCreateCar")]
        public async Task<IActionResult> AdminCreateCar([FromBody] AdminCarDTO carData)
        {
            try
            {
                #region Authentication, Authorization
                // Get token
                var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

                // Check token
                if (authorizationHeader == null || !authorizationHeader.StartsWith("Bearer "))
                {
                    return Unauthorized(ResponseHelper.Response(401, "Authentication token is missing or invalid", false, null));
                }
                // Format token
                var token = authorizationHeader.Split(" ")[1];
                // Get claims
                var claims = JwtTokenHelper.GetUserClaims(token);
                // Verify token
                if (claims == null)
                {
                    return Unauthorized(ResponseHelper.Response(401, "Authentication token is invalid", false, null));
                }
                // Check role
                if (claims.TryGetValue("role", out var roleId) && roleId.ToString() != "1")
                {
                    return Unauthorized(ResponseHelper.Response(401, "Unauthorized access denied", false, null));
                }
                #endregion

                var car = await CarsDAO.GetInstance().GetCarByName(carData.Model);

                if (car != null)
                {
                    return BadRequest(ResponseHelper.Response(400, "Car already exists", false, null));
                }

                var newCar = new Cars
                {
                    Name = carData.Model,
                    Seats = carData.Seat,
                    Quantity = carData.Quantity,

                    Image = carData.Image,
                    SpecImage = carData.SpecImage,
                    ImageBanner = carData.BannerImage,

                    PriceBatteryOwn = carData.PriceBatteryOwn,
                    PriceBatteryRental = carData.PriceBatteryRental,
                    PriceDeposite = carData.PriceDeposite,

                    IsDeleted = false
                };
                if (await CarsDAO.GetInstance().CreateCar(newCar))

                {
                    return Ok(new DataResponse
                    {
                        StatusCode = 200,
                        Message = "Add Car successfully",
                        Success = true
                    });
                }
                else
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Message = "Add Car failed",
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

        [HttpPut("adminUpdateCar/{id}")]
        public async Task<IActionResult> AdminUpdateCar(int id, [FromBody] AdminCarDTO adminCarDTO)
        {
            try
            {
                #region Authentication, Authorization
                // Get token
                var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

                // Check token
                if (authorizationHeader == null || !authorizationHeader.StartsWith("Bearer "))
                {
                    return Unauthorized(ResponseHelper.Response(401, "Authentication token is missing or invalid", false, null));
                }
                // Format token
                var token = authorizationHeader.Split(" ")[1];
                // Get claims
                var claims = JwtTokenHelper.GetUserClaims(token);
                // Verify token
                if (claims == null)
                {
                    return Unauthorized(ResponseHelper.Response(401, "Authentication token is invalid", false, null));
                }
                // Check role
                if (claims.TryGetValue("role", out var roleId) && roleId.ToString() != "1")
                {
                    return Unauthorized(ResponseHelper.Response(401, "Unauthorized access denied", false, null));
                }
                #endregion

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

                car.Name = adminCarDTO.Model;
                car.Seats = adminCarDTO.Seat;
                car.Quantity = adminCarDTO.Quantity;

                car.Image = adminCarDTO.Image;
                car.SpecImage = adminCarDTO.SpecImage;
                car.ImageBanner = adminCarDTO.BannerImage;

                car.PriceBatteryOwn = adminCarDTO.PriceBatteryOwn;
                car.PriceBatteryRental = adminCarDTO.PriceBatteryRental;
                car.PriceDeposite = adminCarDTO.PriceDeposite;

                car.IsDeleted = adminCarDTO.IsDeleted;
                car.IsShowed = adminCarDTO.IsShowed;

                if (await CarsDAO.GetInstance().UpdateCar(car))

                {
                    return Ok(new DataResponse
                    {
                        StatusCode = 200,
                        Message = "Update Car successfully",
                        Success = true
                    });
                }
                else
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Message = "Update Car failed",
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

        [HttpPut("adminUpdateCardImageCar/{id}")]
        public async Task<IActionResult> AdminUpdateImageCar(int id, IFormFile cardImage)
        {
            try
            {
                #region Authentication, Authorization
                // Get token
                var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

                // Check token
                if (authorizationHeader == null || !authorizationHeader.StartsWith("Bearer "))
                {
                    return Unauthorized(ResponseHelper.Response(401, "Authentication token is missing or invalid", false, null));
                }
                // Format token
                var token = authorizationHeader.Split(" ")[1];
                // Get claims
                var claims = JwtTokenHelper.GetUserClaims(token);
                // Verify token
                if (claims == null)
                {
                    return Unauthorized(ResponseHelper.Response(401, "Authentication token is invalid", false, null));
                }
                // Check role
                if (claims.TryGetValue("role", out var roleId) && roleId.ToString() != "1")
                {
                    return Unauthorized(ResponseHelper.Response(401, "Unauthorized access denied", false, null));
                }
                #endregion

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


                car.Image = await SaveFileAsync(cardImage);


                if (await CarsDAO.GetInstance().UpdateCar(car))

                {
                    return Ok(new DataResponse
                    {
                        StatusCode = 200,
                        Message = "Update Car successfully",
                        Success = true
                    });
                }
                else
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Message = "Update Car failed",
                        Success = false
                    });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new DataResponse
                {
                    StatusCode = 500,
                    Message = "Internal server error. Please contact support.",
                    Success = false
                });
            }
        }


        [HttpPut("adminUpdatespecificationsImageCar/{id}")]
        public async Task<IActionResult> AdminUpdatespecificationsImageCar(int id, IFormFile specificationsImage)
        {
            try
            {
                #region Authentication, Authorization
                // Get token
                var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

                // Check token
                if (authorizationHeader == null || !authorizationHeader.StartsWith("Bearer "))
                {
                    return Unauthorized(ResponseHelper.Response(401, "Authentication token is missing or invalid", false, null));
                }
                // Format token
                var token = authorizationHeader.Split(" ")[1];
                // Get claims
                var claims = JwtTokenHelper.GetUserClaims(token);
                // Verify token
                if (claims == null)
                {
                    return Unauthorized(ResponseHelper.Response(401, "Authentication token is invalid", false, null));
                }
                // Check role
                if (claims.TryGetValue("role", out var roleId) && roleId.ToString() != "1")
                {
                    return Unauthorized(ResponseHelper.Response(401, "Unauthorized access denied", false, null));
                }
                #endregion

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


                car.SpecImage = await SaveFileAsync(specificationsImage);


                if (await CarsDAO.GetInstance().UpdateCar(car))

                {
                    return Ok(new DataResponse
                    {
                        StatusCode = 200,
                        Message = "Update Car successfully",
                        Success = true
                    });
                }
                else
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Message = "Update Car failed",
                        Success = false
                    });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new DataResponse
                {
                    StatusCode = 500,
                    Message = "Internal server error. Please contact support.",
                    Success = false
                });
            }
        }

        [HttpPut("adminUpdateBannerImageCar/{id}")]
        public async Task<IActionResult> AdminUpdateBannerImageCar(int id, IFormFile specificationsImage)
        {
            try
            {
                #region Authentication, Authorization
                // Get token
                var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

                // Check token
                if (authorizationHeader == null || !authorizationHeader.StartsWith("Bearer "))
                {
                    return Unauthorized(ResponseHelper.Response(401, "Authentication token is missing or invalid", false, null));
                }
                // Format token
                var token = authorizationHeader.Split(" ")[1];
                // Get claims
                var claims = JwtTokenHelper.GetUserClaims(token);
                // Verify token
                if (claims == null)
                {
                    return Unauthorized(ResponseHelper.Response(401, "Authentication token is invalid", false, null));
                }
                // Check role
                if (claims.TryGetValue("role", out var roleId) && roleId.ToString() != "1")
                {
                    return Unauthorized(ResponseHelper.Response(401, "Unauthorized access denied", false, null));
                }
                #endregion

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


                car.SpecImage = await SaveFileAsync(specificationsImage);


                if (await CarsDAO.GetInstance().UpdateCar(car))

                {
                    return Ok(new DataResponse
                    {
                        StatusCode = 200,
                        Message = "Update Car successfully",
                        Success = true
                    });
                }
                else
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Message = "Update Car failed",
                        Success = false
                    });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new DataResponse
                {
                    StatusCode = 500,
                    Message = "Internal server error. Please contact support.",
                    Success = false
                });
            }
        }

        [HttpPost("adminUpdateColorImageCar")]
        public async Task<IActionResult> AdminUpdateColorImageCar([FromForm] IFormFile colorBigImage,
                                                                  [FromForm] IFormFile colorSmallImage,
                                                                  [FromForm] string color,
                                                                  [FromForm] int carId)
        {
            try
            {
                #region Authentication, Authorization
                // Get token
                var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

                // Check token
                if (authorizationHeader == null || !authorizationHeader.StartsWith("Bearer "))
                {
                    return Unauthorized(ResponseHelper.Response(401, "Authentication token is missing or invalid", false, null));
                }
                // Format token
                var token = authorizationHeader.Split(" ")[1];
                // Get claims
                var claims = JwtTokenHelper.GetUserClaims(token);
                // Verify token
                if (claims == null)
                {
                    return Unauthorized(ResponseHelper.Response(401, "Authentication token is invalid", false, null));
                }
                // Check role
                if (claims.TryGetValue("role", out var roleId) && roleId.ToString() != "1")
                {
                    return Unauthorized(ResponseHelper.Response(401, "Unauthorized access denied", false, null));
                }
                #endregion

                var car = await CarsDAO.GetInstance().GetCarById(carId);

                if (car == null)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "Car not found",
                        Success = false
                    });
                }

                string imageName = $"{color}-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid().ToString("N").Substring(0, 6)}";

                var colorImageCar = new CarColor
                {
                    ColorImage = imageName,
                    CarId = carId,
                    ColorName = color,
                    IsDeleted = false,
                };

                if (await SaveColorImageCarAsync(colorBigImage, colorSmallImage, imageName))
                {
                    if (await CarsDAO.GetInstance().CreateCarColor(colorImageCar))

                    {
                        return Ok(new DataResponse
                        {
                            StatusCode = 200,
                            Message = "Create color Car image successfully",
                            Success = true
                        });
                    }
                    else
                    {
                        return BadRequest(new DataResponse
                        {
                            StatusCode = 400,
                            Message = "Create color Car image failed",
                            Success = false
                        });
                    }
                }
                else
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Message = "Create file color Car image failed",
                        Success = false
                    });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new DataResponse
                {
                    StatusCode = 500,
                    Message = "Internal server error. Please contact support.",
                    Success = false
                });
            }
        }

        private async Task<string> SaveFileAsync(IFormFile file)
        {
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!AllowedExtensions.Contains(extension))
                throw new Exception("Invalid file type");

            if (file.Length > MaxFileSize)
                throw new Exception("File size exceeds limit");

            var fileName = $"{Guid.NewGuid()}{extension}";
            var filePath = Path.Combine(_uploadPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return fileName;
        }

        private async Task<bool> SaveColorImageCarAsync(IFormFile bigColorImageCar, IFormFile smallColorImageCar, string fileName)
        {
            var extension = Path.GetExtension(bigColorImageCar.FileName).ToLowerInvariant();
            var extension2 = Path.GetExtension(smallColorImageCar.FileName).ToLowerInvariant();

            if (!AllowedExtensions.Contains(extension))
                throw new Exception("Invalid file type");

            if (!AllowedExtensions.Contains(extension2))
                throw new Exception("Invalid file type");

            if (bigColorImageCar.Length > MaxFileSize)
                throw new Exception("File size exceeds limit");
            if (smallColorImageCar.Length > MaxFileSize)
                throw new Exception("File size exceeds limit");



            var bigFilePath = Path.Combine(_uploadPathforBigColorImageCar, fileName);
            var smallFilePath = Path.Combine(_uploadPathforSmallColorImageCar, fileName);


            using (var stream = new FileStream(bigFilePath, FileMode.Create))
            {
                await bigColorImageCar.CopyToAsync(stream);
            }
            using (var stream = new FileStream(smallFilePath, FileMode.Create))
            {
                await smallColorImageCar.CopyToAsync(stream);
            }

            return true;
        }
    }
}