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
    public class AdminAccessoriesController : ControllerBase
    {

        private readonly string _uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "Images/AccessoryImages");

        public AdminAccessoriesController()
        {
            if (!Directory.Exists(_uploadPath))
                Directory.CreateDirectory(_uploadPath);
        }

        private static readonly string[] AllowedExtensions = { ".jpg", ".jpeg", ".png", ".gif" };
        private const long MaxFileSize = 5 * 1024 * 1024; // 5MB

        [HttpGet]
        public async Task<ActionResult> AdminGetAllAccessories()
        {
            try
            {
                var adminAccessories = await AccessoriesDAO.GetInstance().GetAllAccessories();
                if (adminAccessories == null || adminAccessories.Count == 0)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "No accessory found",
                        Success = false
                    });
                }
                var admincAccessoryDTOs = AutoMapper.ToAccessoryDTOList(adminAccessories);
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Message = "Get all accessorys successfully",
                    Success = true,
                    Data = admincAccessoryDTOs
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
        public async Task<ActionResult> AdminGetAccessoryById(int id)
        {
            try
            {
                var adminAccessory = await AccessoriesDAO.GetInstance().GetAccessoryById(id);
                if (adminAccessory == null)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "Accessory not found",
                        Success = false
                    });
                }
                var adminAccessoryDTO = AutoMapper.ToAccessoryDTO(adminAccessory);
                return Ok(new DataResponse
                {
                    StatusCode = 200,
                    Message = "Get accessory by id successfully",
                    Success = true,
                    Data = adminAccessoryDTO
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

        [HttpGet("Color/{adminAccessoryId}")]
        // public async Task<IActionResult> AdminGetColorByAccessoryId(int adminAccessoryId)
        // {
        //     try
        //     {
        //         // Admin gets all accessory colors by accessory id
        //         var adminAccessoryColors = await AccessoriesDAO.GetInstance().GetAccessoryColorsByAccessoryId(adminAccessoryId);
        //         if (adminAccessoryColors == null || adminAccessoryColors.Count == 0)
        //         {
        //             return NotFound(new DataResponse
        //             {
        //                 StatusCode = 404,
        //                 Message = "No color found",
        //                 Success = false
        //             });
        //         }
        //         // Convert list of AccessoryColor to list of AdminAccessoryColorDTO
        //         var adminAccessoryColorDTOs = AutoMapper.ToAdminAccessoryColorDTOList(adminAccessoryColors);
        //         return Ok(new DataResponse
        //         {
        //             StatusCode = 200,
        //             Message = "Get all colors by accessory id successfully",
        //             Success = true,
        //             Data = adminAccessoryColorDTOs
        //         });
        //     }
        //     catch (Exception ex)
        //     {
        //         return BadRequest(new DataResponse
        //         {
        //             StatusCode = 400,
        //             Message = ex.Message,
        //             Success = false
        //         });
        //     }
        // }

        [HttpPut("delete/{adminAccessoryId}")]
        // public async Task<IActionResult> AdminDeleteByAccessoryId(int adminAccessoryId)
        // {
        //     try
        //     {
        //         var adminAccessory = await AccessoriesDAO.GetInstance().GetAccessoryById(adminAccessoryId);
        //         if (adminAccessory == null)
        //         {
        //             return NotFound(new DataResponse
        //             {
        //                 StatusCode = 404,
        //                 Message = "Accessory not found",
        //                 Success = false
        //             });
        //         }

        //         adminAccessory.IsDeleted = true;
        //         Console.WriteLine(adminAccessory);
        //         if (await AccessoriesDAO.GetInstance().DeleteAccessoryById(adminAccessory))

        //         {
        //             return Ok(new DataResponse
        //             {
        //                 StatusCode = 200,
        //                 Message = "Accessory deleted successfully",
        //                 Success = true
        //             });
        //         }
        //         else
        //         {
        //             return BadRequest(new DataResponse
        //             {
        //                 StatusCode = 400,
        //                 Message = "Delete accessory failed",
        //                 Success = false
        //             });
        //         }
        //     }
        //     catch (Exception ex)
        //     {
        //         Console.WriteLine(ex.Message);
        //         return BadRequest(new DataResponse
        //         {
        //             StatusCode = 400,
        //             Message = "Internal server error. Please contact support.",
        //             Success = false
        //         });
        //     }
        // }

        [HttpPut("adminAddMoreAccessory/{id}")]
        // public async Task<IActionResult> AdminAddMoreAccessory(int id, [FromBody] AdminAddMoreAccessoryDTO adminAddMoreAccessoryDTO)
        // {
        //     try
        //     {
        //         #region Authentication, Authorization
        //         // Get token
        //         var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

        //         // Check token
        //         if (authorizationHeader == null || !authorizationHeader.StartsWith("Bearer "))
        //         {
        //             return Unauthorized(ResponseHelper.Response(401, "Authentication token is missing or invalid", false, null));
        //         }
        //         // Format token
        //         var token = authorizationHeader.Split(" ")[1];
        //         // Get claims
        //         var claims = JwtTokenHelper.GetUserClaims(token);
        //         // Verify token
        //         if (claims == null)
        //         {
        //             return Unauthorized(ResponseHelper.Response(401, "Authentication token is invalid", false, null));
        //         }
        //         // Check role
        //         if (claims.TryGetValue("role", out var roleId) && roleId.ToString() != "1")
        //         {
        //             return Unauthorized(ResponseHelper.Response(401, "Unauthorized access denied", false, null));
        //         }
        //         #endregion

        //         var adminAccessory = await AccessoriesDAO.GetInstance().GetAccessoryById(id);

        //         if (adminAccessory == null)
        //         {
        //             return NotFound(new DataResponse
        //             {
        //                 StatusCode = 404,
        //                 Message = "Accessory not found",
        //                 Success = false
        //             });
        //         }

        //         adminAccessory.Quantity = adminAccessory.Quantity + adminAddMoreAccessoryDTO.Quantity;

        //         Console.WriteLine(adminAccessory);
        //         if (await AccessoriesDAO.GetInstance().AdminAddMoreAccessory(adminAccessory))

        //         {
        //             return Ok(new DataResponse
        //             {
        //                 StatusCode = 200,
        //                 Message = "Accessory deleted successfully",
        //                 Success = true
        //             });
        //         }
        //         else
        //         {
        //             return BadRequest(new DataResponse
        //             {
        //                 StatusCode = 400,
        //                 Message = "Delete accessory failed",
        //                 Success = false
        //             });
        //         }
        //     }
        //     catch (Exception ex)
        //     {
        //         Console.WriteLine(ex.Message);
        //         return BadRequest(new DataResponse
        //         {
        //             StatusCode = 400,
        //             Message = "Internal server error. Please contact support.",
        //             Success = false
        //         });
        //     }
        // }

        [HttpPost("adminCreateAccessory")]
        public async Task<IActionResult> AdminCreateAccessory([FromBody] AccessoryDTO accessoryData)
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

                var accessory = await AccessoriesDAO.GetInstance().GetAccessoryByName(accessoryData.Name);

                if (accessory != null)
                {
                    return BadRequest(ResponseHelper.Response(400, "Accessory already exists", false, null));
                }

                var newAccessory = new Accessory
                {
                    Name = accessoryData.Name,
                    Image = accessoryData.Image,
                    Price = accessoryData.Price,
                    Quantity = accessoryData.Quantity,
                    Description = accessoryData.Description,
                    IsDeleted = accessoryData.IsDeleted,
                    IsShowed = accessoryData.IsShowed,
                    CategoryId = accessoryData.CategoryId,
                    Origin = accessoryData.Origin,
                    Dimensions = accessoryData.Dimensions,
                    Weight = accessoryData.Weight,
                    Material = accessoryData.Material,
                    Color = accessoryData.Color,
                    Warranty = accessoryData.Warranty
                };
                if (await AccessoriesDAO.GetInstance().CreateAccessory(newAccessory))

                {
                    return Ok(new DataResponse
                    {
                        StatusCode = 200,
                        Message = "Add Accessory successfully",
                        Success = true
                    });
                }
                else
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Message = "Add Accessory failed",
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

        [HttpPut("adminUpdateAccessory/{id}")]
        // public async Task<IActionResult> AdminUpdateAccessory(int id, [FromBody] AdminAccessoryDTO adminAccessoryDTO)
        // {
        //     try
        //     {
        //         #region Authentication, Authorization
        //         // Get token
        //         var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

        //         // Check token
        //         if (authorizationHeader == null || !authorizationHeader.StartsWith("Bearer "))
        //         {
        //             return Unauthorized(ResponseHelper.Response(401, "Authentication token is missing or invalid", false, null));
        //         }
        //         // Format token
        //         var token = authorizationHeader.Split(" ")[1];
        //         // Get claims
        //         var claims = JwtTokenHelper.GetUserClaims(token);
        //         // Verify token
        //         if (claims == null)
        //         {
        //             return Unauthorized(ResponseHelper.Response(401, "Authentication token is invalid", false, null));
        //         }
        //         // Check role
        //         if (claims.TryGetValue("role", out var roleId) && roleId.ToString() != "1")
        //         {
        //             return Unauthorized(ResponseHelper.Response(401, "Unauthorized access denied", false, null));
        //         }
        //         #endregion

        //         var accessory = await AccessoriesDAO.GetInstance().GetAccessoryById(id);

        //         if (accessory == null)
        //         {
        //             return NotFound(new DataResponse
        //             {
        //                 StatusCode = 404,
        //                 Message = "Accessory not found",
        //                 Success = false
        //             });
        //         }

        //         accessory.Name = adminAccessoryDTO.Model;
        //         accessory.Seats = adminAccessoryDTO.Seat;
        //         accessory.Quantity = adminAccessoryDTO.Quantity;

        //         accessory.Image = adminAccessoryDTO.Image;
        //         accessory.SpecImage = adminAccessoryDTO.SpecImage;
        //         accessory.ImageBanner = adminAccessoryDTO.BannerImage;

        //         accessory.PriceBatteryOwn = adminAccessoryDTO.PriceBatteryOwn;
        //         accessory.PriceBatteryRental = adminAccessoryDTO.PriceBatteryRental;
        //         accessory.PriceDeposite = adminAccessoryDTO.PriceDeposite;

        //         accessory.IsDeleted = adminAccessoryDTO.IsDeleted;
        //         accessory.IsShowed = adminAccessoryDTO.IsShowed;

        //         if (await AccessoriesDAO.GetInstance().UpdateAccessory(accessory))

        //         {
        //             return Ok(new DataResponse
        //             {
        //                 StatusCode = 200,
        //                 Message = "Update Accessory successfully",
        //                 Success = true
        //             });
        //         }
        //         else
        //         {
        //             return BadRequest(new DataResponse
        //             {
        //                 StatusCode = 400,
        //                 Message = "Update Accessory failed",
        //                 Success = false
        //             });
        //         }
        //     }
        //     catch (Exception ex)
        //     {
        //         Console.WriteLine(ex.Message);
        //         return BadRequest(new DataResponse
        //         {
        //             StatusCode = 400,
        //             Message = "Internal server error. Please contact support.",
        //             Success = false
        //         });
        //     }
        // }

        [HttpPut("adminUpdateAccessorydImageAccessory/{id}")]
        public async Task<IActionResult> AdminUpdateImageAccessory(int id, IFormFile accessorydImage)
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

                var accessory = await AccessoriesDAO.GetInstance().GetAccessoryById(id);

                if (accessory == null)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "Accessory not found",
                        Success = false
                    });
                }


                accessory.Image = await SaveFileAsync(accessorydImage);


                if (await AccessoriesDAO.GetInstance().UpdateAccessory(accessory))

                {
                    return Ok(new DataResponse
                    {
                        StatusCode = 200,
                        Message = "Update Accessory successfully",
                        Success = true
                    });
                }
                else
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Message = "Update Accessory failed",
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
    }
}