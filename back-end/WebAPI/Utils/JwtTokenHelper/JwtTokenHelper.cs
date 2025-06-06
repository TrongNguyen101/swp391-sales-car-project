using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTO;
using WebAPI.Utils.EncoderHelper;
using WebAPI.Utils.ResponseHelper;

namespace WebAPI.Utils.JwtTokenHelper
{
    public class JwtTokenHelper
    {

        /// <summary>
        /// Generates a JSON Web Token (JWT) for the specified user.
        /// </summary>
        /// <param name="user">The user for whom the JWT is being generated.</param>
        /// <returns>A JWT as a string.</returns>
        /// <remarks>
        /// The JWT is generated using the HS256 algorithm and includes the user's ID, name, email, role, 
        /// issuer, audience, and an expiration time set to one hour from the current time.
        /// </remarks>
        public static string GenerateJwtToken(UserDTO user)
        {
            var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();

            var header = new
            {
                alg = "HS256",
                typ = "JWT"
            };
            var payload = new
            {
                sub = user.UserId,
                name = user.UserName,
                email = user.Email,
                phone = user.Phone,
                role = user.RoleId,
                iss = configuration.GetSection("JWT:Issuer").Value,
                aud = configuration.GetSection("JWT:Audience").Value,
                exp = DateTimeOffset.UtcNow.AddHours(1).ToUnixTimeSeconds()
            };

            string headerJson = JsonSerializer.Serialize(header);
            string payloadJson = JsonSerializer.Serialize(payload);

            string headerEncoded = Base64Url.Encode(headerJson);
            string payloadEncoded = Base64Url.Encode(payloadJson);

            string signature = CreateSignature(headerEncoded, payloadEncoded);

            return $"{headerEncoded}.{payloadEncoded}.{signature}";
        }
        /// <summary>
        /// Creates a signature for the specified header and payload.
        /// </summary>
        /// <param name="headerEncoded"></param>
        /// <param name="payloadEncoded"></param>
        /// <returns>Signature of token</returns>
        public static string CreateSignature(string headerEncoded, string payloadEncoded)
        {
            var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();

            string secretKey = configuration.GetSection("Jwt:Key").Value;
            string message = $"{headerEncoded}.{payloadEncoded}";
            using var hmacsha256 = new HMACSHA256(Encoding.UTF8.GetBytes(secretKey));
            var hash = hmacsha256.ComputeHash(Encoding.UTF8.GetBytes(message));
            return EncoderHelper.Base64Url.Encode(hash.ToString());
        }

        /// <summary>
        /// Verifies the signature of the specified JWT.
        /// </summary>
        /// <param name="token"></param>
        /// <returns>Boolean type for verify token</returns>
        public static bool VerifyJwtToken(dynamic token)
        {
            var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();
            if (token == null)
            {
                return false;
            }
            string secretKey = configuration.GetSection("Jwt:Key").Value;
            string[] parts = token.Split('.');
            string headerEncoded = parts[0];
            string payloadEncoded = parts[1];
            string signature = parts[2];

            string message = $"{headerEncoded}.{payloadEncoded}";
            using var hmacsha256 = new HMACSHA256(Encoding.UTF8.GetBytes(secretKey));
            var hash = hmacsha256.ComputeHash(Encoding.UTF8.GetBytes(message));
            string signatureToCompare = EncoderHelper.Base64Url.Encode(hash.ToString());

            return signature == signatureToCompare;
        }

        /// <summary>
        /// Decodes the payload of the specified JWT.
        /// </summary>
        /// <param name="token"></param>
        /// <returns>Payload JWT token</returns>
        public static object GetUserRole(dynamic token)
        {
            string[] parts = token.Split('.');
            string payload = parts[1];
            string payloadJson = Base64Url.Decode(payload);
            var payloadData = JsonSerializer.Deserialize<Dictionary<string, object>>(payloadJson);

            if (payloadData != null && payloadData.TryGetValue("role", out var roleId))
            {
                return roleId;
            }

            return null;
        }

        public static Dictionary<string, object>? GetUserClaims(dynamic token)
        {
            // Split the token into its parts
            var parts = token?.ToString()?.Split('.');
            // If the token does not have three parts, it is invalid
            if (parts == null || parts.Length < 2) return null;
            // Check if the token is valid
            if (VerifyJwtToken(token) == false) return null;
            // Decode the payload
            try
            {
                var payloadJson = Base64Url.Decode(parts[1]);
                return JsonSerializer.Deserialize<Dictionary<string, object>>(payloadJson);
            }
            catch
            {
                return null;
            }
        }

        /// <summary>
        /// Authenticate and authorize the user based on the specified HTTP context.
        /// </summary>
        /// <param name="httpContext">The HTTP context for the request.</param>
        /// <param name="roleId">The role ID to check for authorization.</param>
        public static (bool isSuccess, string? errorMessage, Dictionary<string, object>? claims) AuthenticateAndAuthorize(HttpContext httpContext, params int[] allowedRoleIds)
        {
            // Get token
            var authorizationHeader = httpContext.Request.Headers["Authorization"].FirstOrDefault();

            // Check token
            if (authorizationHeader == null || !authorizationHeader.StartsWith("Bearer "))
            {
                return (false, "Authentication token is missing or invalid", null);
            }

            // Format token
            var token = authorizationHeader.Split(" ")[1];

            // Get claims
            var claims = GetUserClaims(token);

            // Verify token
            if (claims == null)
            {
                return (false, "Authentication token is invalid", null);
            }

            // Check role
            if (!claims.TryGetValue("role", out var roleId) || !allowedRoleIds.Select(r => r.ToString()).Contains(roleId.ToString()))
            {
                return (false, "Unauthorized access denied", null);
            }

            // Nếu mọi thứ hợp lệ, trả về thành công cùng với claims
            return (true, null, claims);
        }
    }
}