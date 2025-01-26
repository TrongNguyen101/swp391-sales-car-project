using System.Security.Cryptography;
using System.Text;

namespace WebAPI.Utils.EncyptHelper
{
    public class EncyptHelper
    {
        public static string Sha256Encrypt(string input)
        {
            using var sha256 = SHA256.Create();
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
            return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
        }
    }
}