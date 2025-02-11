using castlegameBackend.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace CastleLoginClient
{
    /// <summary>
    /// Interaction logic for LoginWindow.xaml
    /// </summary>
    public partial class LoginWindow : Window
    {
        public HttpClient client;
        public LoginWindow()
        {
            InitializeComponent();
        }

        private async void btnLogin_Click(object sender, RoutedEventArgs e)
        {
            var resopnse = await client.PostAsync($"api/Login/SaltRequest/{tbxLoginName.Text}",
                new StringContent(tbxLoginName.Text, Encoding.UTF8, "text/plain"));
            string salt = await resopnse.Content.ReadAsStringAsync();
            MessageBox.Show(salt);

            string tmpHash = MainWindow.CreateSHA256(tbxPassword.Password +  salt);
            MessageBox.Show(tmpHash);
            LoginDTO dtoUser = new LoginDTO()
            {
                LoginName = tbxLoginName.Text,
                TmpHash = tmpHash
            };

            string felhAdatok = JsonSerializer.Serialize(dtoUser,JsonSerializerOptions.Default);
            var body = new StringContent(felhAdatok,Encoding.UTF8,"application/json");
            var valasz = await client.PostAsync("api/Login/", body);
            var content = await valasz.Content.ReadAsStringAsync();
            MessageBox.Show(content);

            LoggedUser bejelentkezett = JsonSerializer.Deserialize<LoggedUser>(content);

            MessageBox.Show(bejelentkezett.Token);
        }

        private void btnCancel_Click(object sender, RoutedEventArgs e)
        {
            Close();
        }
    }
}
