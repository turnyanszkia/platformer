using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Reflection.Metadata;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using Karbantarto.Classes;

namespace Karbantarto.Services
{
    internal class LoginService
    {
        public static string GetSalt(HttpClient httpClient, string loginName)
        {
            try
            {
                string uri = $"{httpClient.BaseAddress}api/Login/SaltRequest/{loginName}";
                var response = httpClient.PostAsync(uri, null).Result;
                if (response.IsSuccessStatusCode)
                {
                    return response.Content.ReadAsStringAsync().Result;
                }
                else
                {
                    return "Hiba";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public static string Login(HttpClient httpClient, string loginName, string tmpHash)
        {
            string url = $"{httpClient.BaseAddress}api/Login";

            LoginDTO loginUser = new LoginDTO { LoginName = loginName, TmpHash = tmpHash };
            string json = JsonSerializer.Serialize(loginUser);
            var request = new StringContent(json, Encoding.UTF8, "application/json");
            var response = httpClient.PostAsync(url, request).Result;
            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"HTTP hiba: {response.StatusCode}");
            }
            return response.Content.ReadAsStringAsync().Result;
        }

    }
}
