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

        private readonly string _uploadPathforCardImageCar = Path.Combine(Directory.GetCurrentDirectory(), "Images/CarImages");
        private readonly string _uploadPathforSpecImageCar = Path.Combine(Directory.GetCurrentDirectory(), "Images/CarSpec");
        private readonly string _uploadPathforBannerImageCar = Path.Combine(Directory.GetCurrentDirectory(), "Images/CarBanner");
        private readonly string _uploadPathforBigColorImageCar = Path.Combine(Directory.GetCurrentDirectory(), "Images/CarColorDetail");
        private readonly string _uploadPathforSmallColorImageCar = Path.Combine(Directory.GetCurrentDirectory(), "Images/CarColor");



        public AdminCarsController()
        {
            if (!Directory.Exists(_uploadPathforCardImageCar))
                Directory.CreateDirectory(_uploadPathforCardImageCar);
            if (!Directory.Exists(_uploadPathforSpecImageCar))
                Directory.CreateDirectory(_uploadPathforSpecImageCar);
            if (!Directory.Exists(_uploadPathforBigColorImageCar))
                Directory.CreateDirectory(_uploadPathforBigColorImageCar);
            if (!Directory.Exists(_uploadPathforSmallColorImageCar))
                Directory.CreateDirectory(_uploadPathforSmallColorImageCar);
        }

        private static readonly string[] _allowedExtensions = { ".jpg", ".jpeg", ".png", ".gif" };
        private const long MaxFileSize = 5 * 1024 * 1024; // 5MB

        [HttpGet]
        public async Task<ActionResult> AdminGetAllCars()
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

                var adminCars = await CarsDAO.GetInstance().GetAllCars();
                if (adminCars == null || adminCars.Count == 0)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "No car found", false, null));
                }
                var admincCarDTOs = AutoMapper.ToAdminCarDTOList(adminCars);
                return Ok(ResponseHelper.ResponseSuccess(200, "Get all cars successfully", true, admincCarDTOs));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHelper.ResponseError(400, "Failed to get all cars", false, null));
            }
        }

        [HttpGet("StaffGetAllCars")]
        public async Task<ActionResult> StaffGetAllCars()
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
                var (isSuccess, errorMessage, claims) = JwtTokenHelper.AuthenticateAndAuthorize(HttpContext, 3);
                if (!isSuccess)
                {
                    // Return error message if the user is not authenticated or authorized
                    return Unauthorized(ResponseHelper.ResponseError(401, errorMessage ?? "Unknown error", false, null));
                }
                #endregion

                var adminCars = await CarsDAO.GetInstance().StaffGetAllCars();
                if (adminCars == null || adminCars.Count == 0)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "No car found", false, null));
                }
                var admincCarDTOs = AutoMapper.ToAdminCarDTOList(adminCars);
                return Ok(ResponseHelper.ResponseSuccess(200, "Get all cars successfully", true, admincCarDTOs));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHelper.ResponseError(400, "Failed to get all cars", false, null));
            }
        }

        [HttpGet("UserGetAllCars")]
        public async Task<ActionResult> UserGetAllCars()
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
                #region Authentication, Authorization
                // Check authentication and authorization of user based on the specified HTTP context and role that need to check for this function
                // If the user is not authenticated or authorized, return error message
                // If the user is authenticated and authorized, return claims of user
                // admin role id = 1
                // customer role id = 2
                // staff role id = 3
                var (isSuccess, errorMessage, claims) = JwtTokenHelper.AuthenticateAndAuthorize(HttpContext, 1, 3);
                if (!isSuccess)
                {
                    // Return error message if the user is not authenticated or authorized
                    return Unauthorized(ResponseHelper.ResponseError(401, errorMessage ?? "Unknown error", false, null));
                }
                #endregion

                var adminCar = await CarsDAO.GetInstance().GetCarById(id);
                if (adminCar == null)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "Car not found", false, null));
                }
                var adminCarDTO = AutoMapper.ToAdminCarDTO(adminCar);
                return Ok(ResponseHelper.ResponseSuccess(200, "Get car by id successfully", true, adminCarDTO));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ResponseHelper.ResponseError(400, "Internal server error.", false, null));
            }
        }

        [HttpGet("Color/{adminCarId}")]
        public async Task<IActionResult> AdminGetColorByCarId(int adminCarId)
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
                var (isSuccess, errorMessage, claims) = JwtTokenHelper.AuthenticateAndAuthorize(HttpContext, 1, 3);
                if (!isSuccess)
                {
                    // Return error message if the user is not authenticated or authorized
                    return Unauthorized(ResponseHelper.ResponseError(401, errorMessage ?? "Unknown error", false, null));
                }
                #endregion

                // Admin gets all car colors by car id
                var adminCarColors = await CarsDAO.GetInstance().GetCarColorsByCarId(adminCarId);
                if (adminCarColors == null || adminCarColors.Count == 0)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "No color found", false, null));
                }
                // Convert list of CarColor to list of AdminCarColorDTO
                var adminCarColorDTOs = AutoMapper.ToAdminCarColorDTOList(adminCarColors);
                return Ok(ResponseHelper.ResponseSuccess(200, "Get all car colors successfully", true, adminCarColorDTOs));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ResponseHelper.ResponseError(400, "Internal server error", false, null));
            }
        }

        [HttpDelete("deleteCar/{adminCarId}")]
        public async Task<IActionResult> AdminDeleteCarByCarId(int adminCarId)
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
                var (isSuccess, errorMessage, claims) = JwtTokenHelper.AuthenticateAndAuthorize(HttpContext, 1, 3);
                if (!isSuccess)
                {
                    // Return error message if the user is not authenticated or authorized
                    return Unauthorized(ResponseHelper.ResponseError(401, errorMessage ?? "Unknown error", false, null));
                }
                #endregion

                var adminCar = await CarsDAO.GetInstance().GetCarById(adminCarId);
                if (adminCar == null)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "Car not found", false, null));
                }

                if (adminCar.IsDeleted == true)
                {
                    return Conflict(ResponseHelper.ResponseError(409, "Car already deleted", false, null));
                }

                adminCar.IsShowed = false;
                adminCar.IsDeleted = true;
                if (await CarsDAO.GetInstance().DeleteCarById(adminCar))
                {
                    return Ok(ResponseHelper.ResponseSuccess(200, "Delete car successfully", true, null));
                }
                else
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Delete car failed", false, null));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ResponseHelper.ResponseError(400, "Internal server error. Please contact support.", false, null));
            }
        }

        [HttpPut("adminRestoreCar/{adminCarId}")]
        public async Task<IActionResult> AdminRestoreCarByCarId(int adminCarId)
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

                var adminCar = await CarsDAO.GetInstance().GetCarById(adminCarId);
                if (adminCar == null)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "Car not found", false, null));
                }

                adminCar.IsShowed = false;
                adminCar.IsDeleted = false;
                if (await CarsDAO.GetInstance().DeleteCarById(adminCar))
                {
                    return Ok(ResponseHelper.ResponseSuccess(200, "Delete car successfully", true, null));
                }
                else
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Delete car failed", false, null));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ResponseHelper.ResponseError(400, "Internal server error. Please contact support.", false, null));
            }
        }

        [HttpPut("adminAddMoreCar/{id}")]
        public async Task<IActionResult> AdminAddMoreCar(int id, [FromBody] AdminAddMoreCarDTO adminAddMoreCarDTO)
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
                var (isSuccess, errorMessage, claims) = JwtTokenHelper.AuthenticateAndAuthorize(HttpContext, 1, 3);
                if (!isSuccess)
                {
                    // Return error message if the user is not authenticated or authorized
                    return Unauthorized(ResponseHelper.ResponseError(401, errorMessage ?? "Unknown error", false, null));
                }
                #endregion

                var adminCar = await CarsDAO.GetInstance().GetCarById(id);

                if (adminCar == null)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "Car not found", false, null));
                }

                adminCar.Quantity = adminCar.Quantity + adminAddMoreCarDTO.Quantity;

                Console.WriteLine(adminCar);
                if (await CarsDAO.GetInstance().AdminAddMoreCar(adminCar))
                {
                    var importHistory = new ImportExportHistory
                    {
                        CarId = adminCar.Id,
                        Quantity = adminAddMoreCarDTO.Quantity,
                        Type = "import",
                        TransactionDate = DateTime.Now,
                        Note = "Add more car",
                        ProductName = adminCar.Name
                    };
                    await TransactionsDAO.GetInstance().CreateImportExportHistory(importHistory);

                    return Ok(ResponseHelper.ResponseSuccess(200, "Add more car successfully", true, null));
                }
                else
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Add more car failed", false, null));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ResponseHelper.ResponseError(400, "Internal server error. Please contact support.", false, null));
            }
        }
        [HttpPost("adminCreateCar")]
        public async Task<IActionResult> AdminCreateCar([FromBody] AdminCarDTO carData)
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
                var (isSuccess, errorMessage, claims) = JwtTokenHelper.AuthenticateAndAuthorize(HttpContext, 1, 3);
                if (!isSuccess)
                {
                    // Return error message if the user is not authenticated or authorized
                    return Unauthorized(ResponseHelper.ResponseError(401, errorMessage ?? "Unknown error", false, null));
                }
                #endregion

                var carJustCreate = await CarsDAO.GetInstance().GetCarByName(carData.Model);

                if (carJustCreate != null)
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Car already exists", false, null));
                }

                if (carData.PriceDeposite > carData.PriceBatteryRental || carData.PriceDeposite > carData.PriceBatteryOwn)
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Price deposite must be less than price battery rental and price battery own", false, null));
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

                    IsDeleted = false,
                    IsShowed = false,
                };
                if (await CarsDAO.GetInstance().CreateCar(newCar))
                {
                    carJustCreate = await CarsDAO.GetInstance().GetCarByName(carData.Model);
                    var importHistory = new ImportExportHistory
                    {
                        CarId = carJustCreate.Id,
                        Quantity = carData.Quantity,
                        Type = "import",
                        TransactionDate = DateTime.Now,
                        Note = "Create new car",
                        ProductName = carJustCreate.Name
                    };
                    await TransactionsDAO.GetInstance().CreateImportExportHistory(importHistory);
                    return Ok(ResponseHelper.ResponseSuccess(200, "Create car successfully", true, null));
                }
                else
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Create car failed", false, null));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ResponseHelper.ResponseError(400, "Internal server error. Please contact support.", false, null));
            }
        }

        [HttpPut("adminUpdateCar/{id}")]
        public async Task<IActionResult> AdminUpdateCar(int id, [FromBody] AdminCarDTO adminCarDTO)
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
                var (isSuccess, errorMessage, claims) = JwtTokenHelper.AuthenticateAndAuthorize(HttpContext, 1, 3);
                if (!isSuccess)
                {
                    // Return error message if the user is not authenticated or authorized
                    return Unauthorized(ResponseHelper.ResponseError(401, errorMessage ?? "Unknown error", false, null));
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

                car.PriceBatteryOwn = adminCarDTO.PriceBatteryOwn;
                car.PriceBatteryRental = adminCarDTO.PriceBatteryRental;


                if (adminCarDTO.PriceDeposite > adminCarDTO.PriceBatteryRental || adminCarDTO.PriceDeposite > adminCarDTO.PriceBatteryOwn)
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Price deposite must be less than price battery rental and price battery own", false, null));
                }

                car.PriceDeposite = adminCarDTO.PriceDeposite;

                if (car.IsShowed == false && adminCarDTO.IsShowed == true)
                {
                    if (car.Image == null)
                    {
                        return BadRequest(ResponseHelper.ResponseError(400, "Card image of car is required", false, null));
                    }
                    var listImage = await CarsDAO.GetInstance().GetCarColorsByCarId(id);
                    if (listImage == null || listImage.Count == 0)
                    {
                        return BadRequest(ResponseHelper.ResponseError(400, "Color image of car is required", false, null));
                    }
                    car.IsShowed = adminCarDTO.IsShowed;
                }
                else
                {
                    car.IsShowed = adminCarDTO.IsShowed;
                }

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

        [HttpPut("adminDeleteImageOfCar/{id}/{typeOfImage}")]
        public async Task<IActionResult> AdminDeleteCardImageOfCar(int id, string typeOfImage)
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
                var (isSuccess, errorMessage, claims) = JwtTokenHelper.AuthenticateAndAuthorize(HttpContext, 1, 3);
                if (!isSuccess)
                {
                    // Return error message if the user is not authenticated or authorized
                    return Unauthorized(ResponseHelper.ResponseError(401, errorMessage ?? "Unknown error", false, null));
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
                // Delete image of car
                if (typeOfImage == "specificationsImage")
                {
                    car.SpecImage = null;
                }
                else if (typeOfImage == "cardImage")
                {
                    car.Image = null;
                }
                else if (typeOfImage == "bannerImage")
                {
                    car.ImageBanner = null;
                }
                else
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Message = "Invalid type of image",
                        Success = false
                    });
                }

                if (await CarsDAO.GetInstance().UpdateCar(car))
                {
                    return Ok(new DataResponse
                    {
                        StatusCode = 200,
                        Message = "Delete card image of car successfully",
                        Success = true
                    });
                }
                else
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Message = "Delete card image of car failed",
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
                    Message = "Delete card image of car failed. Internal server error. Please contact support.",
                    Success = false
                });
            }
        }


        [HttpPut("adminUpdateImageCar/{id}")]
        public async Task<IActionResult> AdminUpdateImageCar(int id, IFormFile? cardImage, IFormFile? specificationsImage, IFormFile? bannerImage)
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
                var (isSuccess, errorMessage, claims) = JwtTokenHelper.AuthenticateAndAuthorize(HttpContext, 1, 3);
                if (!isSuccess)
                {
                    // Return error message if the user is not authenticated or authorized
                    return Unauthorized(ResponseHelper.ResponseError(401, errorMessage ?? "Unknown error", false, null));
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

                if (cardImage != null)
                {
                    car.Image = await SaveImageFileAsync(cardImage, _uploadPathforCardImageCar);
                }

                if (specificationsImage != null)
                {
                    car.SpecImage = await SaveImageFileAsync(specificationsImage, _uploadPathforSpecImageCar);
                }

                if (bannerImage != null)
                {
                    car.ImageBanner = await SaveImageFileAsync(bannerImage, _uploadPathforBannerImageCar);
                }


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
                // Check authentication and authorization of user based on the specified HTTP context and role that need to check for this function
                // If the user is not authenticated or authorized, return error message
                // If the user is authenticated and authorized, return claims of user
                // admin role id = 1
                // customer role id = 2
                // staff role id = 3
                var (isSuccess, errorMessage, claims) = JwtTokenHelper.AuthenticateAndAuthorize(HttpContext, 1, 3);
                if (!isSuccess)
                {
                    // Return error message if the user is not authenticated or authorized
                    return Unauthorized(ResponseHelper.ResponseError(401, errorMessage ?? "Unknown error", false, null));
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
                // check file type
                var extension = Path.GetExtension(colorBigImage.FileName).ToLowerInvariant();
                var extension2 = Path.GetExtension(colorSmallImage.FileName).ToLowerInvariant();
                if (!_allowedExtensions.Contains(extension) || !_allowedExtensions.Contains(extension2))
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Message = "Invalid file type",
                        Success = false
                    });
                }

                // create new image name
                string imageName = $"{color}-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid().ToString("N").Substring(0, 6)}";
                imageName = $"{imageName}{extension}";

                // save new object color image to database
                // check file save success
                if (await SaveColorImageCarAsync(colorBigImage, colorSmallImage, imageName))
                {
                    var colorImageCar = new CarColor
                    {
                        ColorImage = imageName,
                        CarId = carId,
                        ColorName = color,
                        IsDeleted = false,
                    };
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

        private async Task<string> SaveImageFileAsync(IFormFile file, string uploadFilePath)
        {
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!_allowedExtensions.Contains(extension))
                throw new Exception("Invalid file type");

            if (file.Length > MaxFileSize)
                throw new Exception("File size exceeds limit");

            var originalFileName = Path.GetFileNameWithoutExtension(file.FileName);
            var fileName = $"{originalFileName}{Guid.NewGuid().ToString("N").Substring(0, 6)}{extension}";
            var filePath = Path.Combine(uploadFilePath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return fileName;
        }

        private async Task<bool> SaveColorImageCarAsync(IFormFile bigColorImageCar, IFormFile smallColorImageCar, string fileName)
        {
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

        [HttpDelete("adminDeleteColorImageCar/{idImageColor}")]
        public async Task<ActionResult> AdminDeleteColorImageCar(int idImageColor)
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
                var (isSuccess, errorMessage, claims) = JwtTokenHelper.AuthenticateAndAuthorize(HttpContext, 1, 3);
                if (!isSuccess)
                {
                    // Return error message if the user is not authenticated or authorized
                    return Unauthorized(ResponseHelper.ResponseError(401, errorMessage ?? "Unknown error", false, null));
                }
                #endregion

                var imageColorOfCar = await CarsDAO.GetInstance().GetColorImageOfCarById(idImageColor);

                if (imageColorOfCar == null)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "Image color of car is not found", false, null));
                }

                // If image color of car existed, delete image color of car
                if (await CarsDAO.GetInstance().DeleteColorImageOfCar(imageColorOfCar))
                {
                    return Ok(ResponseHelper.ResponseSuccess(200, "Deleted color image of car successfully", true, null));
                }
                else
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Error: can't delete color image of car", false, null));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Delete image color of car failed: " + ex);
                return BadRequest(ResponseHelper.ResponseError(400, "Internal server error. Please contact support.", false, null));
            }
        }

        [HttpGet("adminGetColor/{carId}")]
        public async Task<IActionResult> GetColorByCarId(int carId)
        {
            try
            {
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
                    Data = carColorDTOs
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