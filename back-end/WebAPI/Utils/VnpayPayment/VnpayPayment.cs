using System.Text;
using System.Security.Cryptography;
using WebAPI.DTO;

namespace WebAPI.Utils.VnpayPayment
{
    public class VnpayPayment
    {
        private readonly string? VnpayUrl;
        private readonly string? ReturnUrl;
        private readonly string? TmnCode;
        private readonly string? HashSecret;

        public VnpayPayment(IConfiguration configuration)
        {
            var vnpaySettings = configuration.GetSection("VnpayPayment").Get<VnpaySettings>();
            VnpayUrl = vnpaySettings.VnpayUrl;
            ReturnUrl = vnpaySettings.ReturnUrl;
            TmnCode = vnpaySettings.TmnCode;
            HashSecret = vnpaySettings.HashSecret;
        }

        public string CreatePaymentUrl(DepositInfo depositInfo)
        {
            var amountDouble = FormatStringToDouble(depositInfo.Amount);
            var vnpay = new SortedList<string, string>();
            vnpay.Add("vnp_Version", "2");
            vnpay.Add("vnp_Command", "pay");
            vnpay.Add("vnp_TmnCode", TmnCode);
            vnpay.Add("vnp_Amount", ((double)amountDouble * 100).ToString());
            vnpay.Add("vnp_CurrCode", "VND");
            vnpay.Add("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss"));
            vnpay.Add("vnp_OrderInfo", $"{depositInfo.OrderInfo}");
            vnpay.Add("vnp_ReturnUrl", ReturnUrl);
            vnpay.Add("vnp_Locale", "en");
            vnpay.Add("vnp_TxnRef", DateTime.Now.Ticks.ToString());
            vnpay.Add("vnp_IpAddr", "127.0.0.1");

            string queryString = string.Join("&", vnpay.Select(x => $"{x.Key}={Uri.EscapeDataString(x.Value)}"));
            string signData = string.Join("&", vnpay.Select(x => $"{x.Key}={x.Value}"));
            string vnp_SecureHash = ComputeHMACSHA512(signData, HashSecret);

            return $"{VnpayUrl}?{queryString}&vnp_SecureHash={vnp_SecureHash}";
        }
        public string ComputeHMACSHA512(string data, string key)
        {
            using (var hmac = new HMACSHA512(Encoding.UTF8.GetBytes(key)))
            {
                byte[] hashValue = hmac.ComputeHash(Encoding.UTF8.GetBytes(data));
                return BitConverter.ToString(hashValue).Replace("-", "").ToLower();
            }
        }

        private double FormatStringToDouble(string amount)
        {
            if (string.IsNullOrEmpty(amount))
            {
                throw new ArgumentException("Amount cannot be null or empty", nameof(amount));
            }
            string cleanedAmount = amount.Replace(".", "");

            if (double.TryParse(cleanedAmount, out double result))
            {
                return result;
            }
            else
            {
                throw new FormatException("Invalid amount format");
            }
        }
    }
}