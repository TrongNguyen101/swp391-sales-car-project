using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using WebAPI.DTO;
using WebAPI.Utils.EncoderHelper;

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
            if(token == null)
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

    }
}