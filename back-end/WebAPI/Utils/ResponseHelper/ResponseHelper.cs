using Microsoft.AspNetCore.Mvc;
using WebAPI.DTO;
namespace WebAPI.Utils.ResponseHelper
{
    public static class ResponseHelper
    {
        public static ActionResult Response(int statusCode, string message, bool success, object? data)
        {
            return new OkObjectResult(new DataResponse
            {
                StatusCode = statusCode,
                Message = message,
                Success = success,
                Data = data
            });
        }

        public static DataResponse ResponseError(int statusCode, string message, bool success, object? data)
        {
            return new DataResponse
            {
                StatusCode = statusCode,
                Message = message,
                Success = success,
                Data = data
            };
        }

        public static DataResponse ResponseSuccess(int statusCode, string message, bool success, object? data)
        {
            return new DataResponse
            {
                StatusCode = statusCode,
                Message = message,
                Success = success,
                Data = data
            };
        }
    }
}
