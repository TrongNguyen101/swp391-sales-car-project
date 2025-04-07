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

                var adminAccessories = await AccessoriesDAO.GetInstance().GetAllAccessories();
                if (adminAccessories == null || adminAccessories.Count == 0)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "No accessory found", false, null));
                }
                var admincAccessoryDTOs = AutoMapper.ToAccessoryDTOList(adminAccessories);
                return Ok(ResponseHelper.ResponseSuccess(200, "Get all accessories successfully", true, admincAccessoryDTOs));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ResponseHelper.ResponseError(400, "Internal server error.", false, null));
            }
        }

        [HttpGet("staffGetAllAccessories")]
        public async Task<ActionResult> StaffGetAllAccessories()
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

                var adminAccessories = await AccessoriesDAO.GetInstance().StaffGetAllAccessories();
                if (adminAccessories == null || adminAccessories.Count == 0)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "No accessory found", false, null));
                }
                var admincAccessoryDTOs = AutoMapper.ToAccessoryDTOList(adminAccessories);
                return Ok(ResponseHelper.ResponseSuccess(200, "Get all accessories successfully", true, admincAccessoryDTOs));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ResponseHelper.ResponseError(400, "Internal server error.", false, null));
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> AdminGetAccessoryById(int id)
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

                var adminAccessory = await AccessoriesDAO.GetInstance().GetAccessoryById(id);
                if (adminAccessory == null)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "Accessory not found", false, null));
                }
                var adminAccessoryDTO = AutoMapper.ToAccessoryDTO(adminAccessory);
                return Ok(ResponseHelper.ResponseSuccess(200, "Get accessory successfully", true, adminAccessoryDTO));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ResponseHelper.ResponseError(400, "Internal server error. Please contact support.", false, null));
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

                var accessory = await AccessoriesDAO.GetInstance().GetAccessoryByName(accessoryData.Name);

                if (accessory != null)
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Accessory already exists", false, null));
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
                    return Ok(ResponseHelper.ResponseSuccess(200, "Add Accessory successfully", true, null));
                }
                else
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Add Accessory failed", false, null));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ResponseHelper.ResponseError(400, "Internal server error. Please contact support.", false, null));
            }
        }

        [HttpPut("adminUpdateAccessory/{id}")]
        public async Task<IActionResult> AdminUpdateAccessory(int id, [FromBody] AccessoryDTO adminAccessoryDTO)
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

                var accessory = await AccessoriesDAO.GetInstance().GetAccessoryById(id);

                if (accessory == null)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "Accessory not found", false, null));
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


                if (accessory.IsShowed == false && adminAccessoryDTO.IsShowed == true)
                {
                    if (accessory.Image == null)
                    {
                        return BadRequest(ResponseHelper.ResponseError(400, "Card image is required", false, null));
                    }
                    var listImage = await AccessoriesDAO.GetInstance().GetAccessoryImagesByAccessoryId(id);
                    if (listImage == null || listImage.Count == 0)
                    {
                        return BadRequest(ResponseHelper.ResponseError(400, "Detail image is required", false, null));
                    }

                    accessory.IsShowed = adminAccessoryDTO.IsShowed;
                }
                else
                {
                    accessory.IsShowed = adminAccessoryDTO.IsShowed;
                }

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
                    return Ok(ResponseHelper.ResponseSuccess(200, "Update Accessory successfully", true, null));
                }
                else
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Update Accessory failed", false, null));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ResponseHelper.ResponseError(400, "Internal server error. Please contact support.", false, null));
            }
        }


        [HttpPut("adminUpdateImageAccessory/{adminAccessoryId}")]
        public async Task<IActionResult> AdminUpdateImageCar(int adminAccessoryId, IFormFile? cardImage)
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

                var accessory = await AccessoriesDAO.GetInstance().GetAccessoryById(adminAccessoryId);

                if (accessory == null)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "Accessory not found", false, null));
                }

                if (cardImage != null)
                {
                    accessory.Image = await SaveImageFileAsync(cardImage, _uploadPathforCardImageAccessories);
                }

                if (await AccessoriesDAO.GetInstance().UpdateAccessory(accessory))

                {
                    return Ok(ResponseHelper.ResponseSuccess(200, "Update card image of accessory successfully", true, null));
                }
                else
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Update card image of accessory failed", false, null));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ResponseHelper.ResponseError(400, "Update card image of accessory failed. Internal server error. Please contact support.", false, null));
            }
        }

        [HttpPut("adminDeleteImageOfAccessory/{adminAccessoryId}/{typeOfImage}")]
        public async Task<IActionResult> AdminDeleteCardImageOfCar(int adminAccessoryId, string typeOfImage)
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

                var accessory = await AccessoriesDAO.GetInstance().GetAccessoryById(adminAccessoryId);

                if (accessory == null)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "Accessory not found", false, null));
                }
                // Delete image of car
                if (typeOfImage == "cardImage")
                {
                    accessory.Image = null;
                }
                else
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Type of image is invalid", false, null));
                }

                if (await AccessoriesDAO.GetInstance().UpdateAccessory(accessory))
                {
                    return Ok(ResponseHelper.ResponseSuccess(200, "Delete card image of accessory successfully", true, null));
                }
                else
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Delete card image of accessory failed", false, null));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ResponseHelper.ResponseError(400, "Delete card image of accessory failed. Internal server error. Please contact support.", false, null));
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

                var accessory = await AccessoriesDAO.GetInstance().GetAccessoryById(accessoryId);

                if (accessory == null)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "Accessory not found", false, null));
                }

                // save image
                string imageName = await SaveImageFileAsync(detailImage, _uploadPathforCardImageAccessories);

                if (imageName == null)
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Image is invalid", false, null));
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
                    return Ok(ResponseHelper.ResponseSuccess(200, "Create detail image accessory successfully", true, null));
                }
                else
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Create detail image accessory failed", false, null));
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ResponseHelper.ResponseError(400, "Create detail image accessory failed. Internal server error. Please contact support.", false, null));
            }
        }

        [HttpDelete("adminDeleteDetailImageAccessory/{idDetailImage}")]
        public async Task<ActionResult> AdminDeleteColorImageCar(int idDetailImage)
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

                var imageDetail = await AccessoriesDAO.GetInstance().GetDetailImageAccessory(idDetailImage);

                if (imageDetail == null)
                {
                    return NotFound(ResponseHelper.ResponseError(404, "Image color of car is not found", false, null));
                }

                // If image color of car existed, delete image color of car
                if (await AccessoriesDAO.GetInstance().DeleteDetailImageAccessory(imageDetail))
                {
                    return Ok(ResponseHelper.ResponseSuccess(200, "Delete dettails image of accessory successfully", true, null));
                }
                else
                {
                    return BadRequest(ResponseHelper.ResponseError(400, "Error: can't delete dettails image of accessory", false, null));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Delete dettails image of accessory failed: " + ex);
                return BadRequest(ResponseHelper.ResponseError(404, "Internal server error. Please contact support.", false, null));
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