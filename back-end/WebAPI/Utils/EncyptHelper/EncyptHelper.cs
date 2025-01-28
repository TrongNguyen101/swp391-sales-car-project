using System.Security.Cryptography;
using System.Text;

namespace WebAPI.Utils.EncyptHelper
{
    public class EncyptHelper
    {
        /// <summary>
        /// Encrypt a string using SHA256
        /// </summary>
        /// <param name="input"></param>
        /// <returns>String encrypt</returns>
        public static string Sha256Encrypt(string input)
        {
            using var sha256 = SHA256.Create();
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
            return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
        }

        /// <summary>
        /// Encrypt a string using HMAC SHA256
        /// </summary>
        /// <param name="key"></param>
        /// <param name="message"></param>
        /// <returns>String encrypt</returns>
        public static string HmacSha256Encrypt(string key, string message)
        {
            using var hmacsha256 = new HMACSHA256(Encoding.UTF8.GetBytes(key));
            var messageBytes = Encoding.UTF8.GetBytes(message);
            var hashedBytes = hmacsha256.ComputeHash(messageBytes);
            return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
        }
    }
}