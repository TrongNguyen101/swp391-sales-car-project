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
            var vnpaySettings = configuration.GetSection("VnpaySettings").Get<VnpaySettings>();
            VnpayUrl = vnpaySettings.VnpayUrl;
            ReturnUrl = vnpaySettings.ReturnUrl;
            TmnCode = vnpaySettings.TmnCode;
            HashSecret = vnpaySettings.HashSecret;
        }

        public string CreatePaymentUrl(double amount, string orderInfo)
        {
            var vnpay = new SortedList<string, string>();
            vnpay.Add("vnp_Version", "2.0.0");
            vnpay.Add("vnp_Command", "pay");
            vnpay.Add("vnp_TmnCode", TmnCode);
            vnpay.Add("vnp_Amount", (amount * 100).ToString());
            vnpay.Add("vnp_CurrCode", "VND");
            vnpay.Add("vnp_BankCode", "NCB");
            vnpay.Add("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss"));
            vnpay.Add("vnp_OrderInfo", orderInfo);
            vnpay.Add("vnp_ReturnUrl", ReturnUrl);
            vnpay.Add("vnp_Locale", "vn");
            vnpay.Add("vnp_TxnRef", DateTime.Now.Ticks.ToString());

            string queryString = string.Join("&", vnpay.Select(x => $"{x.Key}={Uri.EscapeDataString(x.Value)}"));
            string signData = HashSecret + queryString;
            string vnp_SecureHash = ComputeHMACSHA512(signData, HashSecret);

            return $"{VnpayUrl}?{queryString}&vnp_SecureHash={vnp_SecureHash}";
        }

        private string ComputeHMACSHA512(string data, string key)
        {
            using (var hmac = new HMACSHA512(Encoding.UTF8.GetBytes(key)))
            {
                byte[] hashValue = hmac.ComputeHash(Encoding.UTF8.GetBytes(data));
                return BitConverter.ToString(hashValue).Replace("-", "").ToLower();
            }
        }

        public async Task<PaymentResponse> ProcessPaymentResponse(HttpRequestMessage request)
        {
            var queryParams = System.Web.HttpUtility.ParseQueryString(request.RequestUri.Query);
            var vnp_SecureHash = queryParams["vnp_SecureHash"];
            queryParams.Remove("vnp_SecureHash");

            string rawData = string.Join("&", queryParams.AllKeys.OrderBy(k => k).Select(k => $"{k}={queryParams[k]}"));
            string computedHash = ComputeHMACSHA512(rawData, HashSecret);

            if (vnp_SecureHash == computedHash)
            {
                var response = new PaymentResponse
                {
                    Amount = double.Parse(queryParams["vnp_Amount"]) / 100,
                    OrderInfo = queryParams["vnp_OrderInfo"],
                    TransactionStatus = queryParams["vnp_TransactionStatus"]
                };

                return response;
            }

            return null;
        }
    }
}