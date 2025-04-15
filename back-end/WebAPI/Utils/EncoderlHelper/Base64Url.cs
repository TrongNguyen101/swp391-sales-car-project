using System.Text;

namespace WebAPI.Utils.EncoderHelper
{
    public class Base64Url
    {
        /// <summary>
        /// Encode a string to Base64Url
        /// </summary>
        /// <param name="plainText"></param>
        /// <returns>String endcoded</returns>
        public static string Encode(string plainText)
        {
            var plainTextBytes = Encoding.UTF8.GetBytes(plainText);
            var base64String = Convert.ToBase64String(plainTextBytes);
            return base64String.Replace('+', '-').Replace('/', '_').TrimEnd('=');
        }

        /// <summary>
        /// Decode a Base64Url encoded string
        /// </summary>
        /// <param name="base64UrlEncodedData"></param>
        /// <returns>String decoded</returns>
        public static string Decode(string base64UrlEncodedData)
        {
            var base64String = base64UrlEncodedData.Replace('-', '+').Replace('_', '/');
            switch (base64UrlEncodedData.Length % 4)
            {
                case 2: base64String += "=="; break;
                case 3: base64String += "="; break;
            }
            var base64EncodedBytes = Convert.FromBase64String(base64String);
            return Encoding.UTF8.GetString(base64EncodedBytes);
        }
    }
}