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

        private readonly string _uploadPathforCardImageAccessories = Path.Combine(Directory.GetCurrentDirectory(), "Images/AccessoryImage");



        public AdminAccessoriesController()
        {
            if (!Directory.Exists(_uploadPathforCardImageAccessories))
                Directory.CreateDirectory(_uploadPathforCardImageAccessories);
        }

        private static readonly string[] _allowedExtensions = { ".jpg", ".jpeg", ".png", ".gif" };
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


        [HttpDelete("delete/{adminAccessoryId}")]
        public async Task<IActionResult> AdminDeleteByAccessoryId(int adminAccessoryId)
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

                var adminAccessory = await AccessoriesDAO.GetInstance().GetAccessoryById(adminAccessoryId);

                if (adminAccessory == null)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "Accessory not found", false, null));
                }

                if (adminAccessory.IsDeleted == true)
                {
                    return Conflict(ResponseHelper.ResponseError(409, "Accessory already deleted", false, null));
                }

                adminAccessory.IsDeleted = true;
                adminAccessory.IsShowed = false;

                Console.WriteLine(adminAccessory);
                if (await AccessoriesDAO.GetInstance().UpdateAccessory(adminAccessory))
                {
                    return Ok(ResponseHelper.ResponseSuccess(200, "Delete accessory successfully", true, null));
                }
                else
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Error: can't delete accessory", false, null));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ResponseHelper.ResponseError(400, "Internal server error. Please contact support.", false, null));
            }
        }

        [HttpPut("adminRestoreAccessory/{adminAccessoryId}")]
        public async Task<IActionResult> AdminRestoreAccessoryById(int adminAccessoryId)
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

                var adminAccessory = await AccessoriesDAO.GetInstance().GetAccessoryById(adminAccessoryId);

                if (adminAccessory == null)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "Accessory not found", false, null));
                }

                adminAccessory.IsDeleted = false;
                adminAccessory.IsShowed = false;

                Console.WriteLine(adminAccessory);
                if (await AccessoriesDAO.GetInstance().UpdateAccessory(adminAccessory))
                {
                    return Ok(ResponseHelper.ResponseSuccess(200, "Restore accessory successfully", true, null));
                }
                else
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Error: can't Restore accessory", false, null));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ResponseHelper.ResponseError(400, "Internal server error. Please contact support.", false, null));
            }
        }

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
                    IsShowed = accessoryData.IsShowed,
                    CategoryId = accessoryData.CategoryId,
                    Origin = accessoryData.Origin,
                    Dimensions = accessoryData.Dimensions,
                    Weight = accessoryData.Weight,
                    Material = accessoryData.Material,
                    Color = accessoryData.Color,
                    Warranty = accessoryData.Warranty
                };

                var accesssoryJustCreate = await AccessoriesDAO.GetInstance().CreateAccessory(newAccessory);

                if (accesssoryJustCreate != null)
                {

                    var importHistory = new ImportExportHistory
                    {
                        AccessoryId = accesssoryJustCreate.Id,
                        Quantity = accesssoryJustCreate.Quantity,
                        Type = "import",
                        TransactionDate = DateTime.Now,
                        Note = "Create new accessory",
                        ProductName = accesssoryJustCreate.Name
                    };
                    await TransactionsDAO.GetInstance().CreateImportExportHistory(importHistory);
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
        public async Task<IActionResult> AdminUpdateAccessory(int id, [FromBody] AccessoryDTO adminAccessoryDTO)
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

                accessory.Name = adminAccessoryDTO.Name;
                accessory.Price = adminAccessoryDTO.Price;
                accessory.Quantity += adminAccessoryDTO.Quantity;
                accessory.Description = adminAccessoryDTO.Description;
                accessory.CategoryId = adminAccessoryDTO.CategoryId;
                accessory.Origin = adminAccessoryDTO.Origin;
                accessory.Dimensions = adminAccessoryDTO.Dimensions;
                accessory.Weight = adminAccessoryDTO.Weight;
                accessory.Material = adminAccessoryDTO.Material;
                accessory.Color = adminAccessoryDTO.Color;
                accessory.Warranty = adminAccessoryDTO.Warranty;
                accessory.IsShowed = adminAccessoryDTO.IsShowed;

                if (await AccessoriesDAO.GetInstance().UpdateAccessory(accessory))
                {
                    if (adminAccessoryDTO.Quantity > 0)
                    {
                        var importHistory = new ImportExportHistory
                        {
                            AccessoryId = id,
                            Quantity = adminAccessoryDTO.Quantity,
                            Type = "import",
                            TransactionDate = DateTime.Now,
                            Note = "Import accessory",
                            ProductName = adminAccessoryDTO.Name
                        };
                        await TransactionsDAO.GetInstance().CreateImportExportHistory(importHistory);
                    }
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
                    StatusCode = 400,
                    Message = "Internal server error. Please contact support.",
                    Success = false
                });
            }
        }


        [HttpPut("adminUpdateImageAccessory/{adminAccessoryId}")]
        public async Task<IActionResult> AdminUpdateImageCar(int adminAccessoryId, IFormFile? cardImage)
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

                var accessory = await AccessoriesDAO.GetInstance().GetAccessoryById(adminAccessoryId);

                if (accessory == null)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "Accessory not found",
                        Success = false
                    });
                }

                if (cardImage != null)
                {
                    accessory.Image = await SaveImageFileAsync(cardImage, _uploadPathforCardImageAccessories);
                }

                if (await AccessoriesDAO.GetInstance().UpdateAccessory(accessory))

                {
                    return Ok(new DataResponse
                    {
                        StatusCode = 200,
                        Message = "Updating card image of accessory successfully",
                        Success = true
                    });
                }
                else
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Message = "Updating card image of accessory failed",
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

        [HttpPut("adminDeleteImageOfAccessory/{adminAccessoryId}/{typeOfImage}")]
        public async Task<IActionResult> AdminDeleteCardImageOfCar(int adminAccessoryId, string typeOfImage)
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

                var accessory = await AccessoriesDAO.GetInstance().GetAccessoryById(adminAccessoryId);

                if (accessory == null)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "Accessory is not found",
                        Success = false
                    });
                }
                // Delete image of car
                if (typeOfImage == "cardImage")
                {
                    accessory.Image = null;
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

                if (await AccessoriesDAO.GetInstance().UpdateAccessory(accessory))
                {
                    return Ok(new DataResponse
                    {
                        StatusCode = 200,
                        Message = "The card image of accessory have deleted successfully",
                        Success = true
                    });
                }
                else
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Message = "Deleting card image of accessory failed",
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
                    Message = "Delete card image of accessory failed. Internal server error. Please contact support.",
                    Success = false
                });
            }
        }

        [HttpPost("adminUpdateDetailImageAccessory")]
        public async Task<IActionResult> AdminUpdateDetailImageAccessory([FromForm] IFormFile detailImage,
                                                                  [FromForm] string color,
                                                                  [FromForm] int accessoryId)
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

                var accessory = await AccessoriesDAO.GetInstance().GetAccessoryById(accessoryId);

                if (accessory == null)
                {
                    return NotFound(new DataResponse
                    {
                        StatusCode = 404,
                        Message = "Accessory is not found",
                        Success = false
                    });
                }

                // save image
                string imageName = await SaveImageFileAsync(detailImage, _uploadPathforCardImageAccessories);

                if (imageName == null)
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Message = "Save image failed",
                        Success = false
                    });
                }

                // create new object color image to database
                var detailImageAccessory = new AccessoryImage
                {
                    ColorImage = imageName,
                    AccessoryId = accessoryId,
                    ColorName = color,
                    IsDeleted = false,

                };

                if (await AccessoriesDAO.GetInstance().CreateDetailImageAccessory(detailImageAccessory))
                {
                    return Ok(new DataResponse
                    {
                        StatusCode = 200,
                        Message = "Create detail image accessory successfully",
                        Success = true
                    });
                }
                else
                {
                    return BadRequest(new DataResponse
                    {
                        StatusCode = 400,
                        Message = "Create detail image accessory failed",
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

        [HttpDelete("adminDeleteDetailImageAccessory/{idDetailImage}")]
        public async Task<ActionResult> AdminDeleteColorImageCar(int idDetailImage)
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

                var imageDetail = await AccessoriesDAO.GetInstance().GetDetailImageAccessory(idDetailImage);

                if (imageDetail == null)
                {
                    return NotFound(ResponseHelper.Response(404, "Image color of car is not found", false, null));
                }

                // If image color of car existed, delete image color of car
                if (await AccessoriesDAO.GetInstance().DeleteDetailImageAccessory(imageDetail))
                {
                    return Ok(ResponseHelper.Response(200, "Delete dettails image of accessory successfully", true, null));
                }
                else
                {
                    return BadRequest(ResponseHelper.Response(400, "Error: can't delete dettails image of accessory", false, null));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Delete dettails image of accessory failed: " + ex);
                return BadRequest(ResponseHelper.Response(404, "Internal server error. Please contact support.", false, null));
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
    }
}