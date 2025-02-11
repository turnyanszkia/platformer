using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using Karbantarto.Services;
using Karbantarto.Classes;
using System.Text.Json;

namespace Karbantarto.Windows
{
    /// <summary>
    /// Interaction logic for Login.xaml
    /// </summary>
    public partial class Login : Window
    {
        private int probalkozasokSzama = 0;
        public Login()
        {
            InitializeComponent();
        }

        void CloseWindow(object sender, CancelEventArgs e)
        {
            if (!Karbantarto.Menu.bejelentkezve)
            {
                Application.Current.Shutdown();
            }
        }

        private void LoginNev_TextChanged(object sender, TextChangedEventArgs e)
        {
            if (LoginNev.Text == "")
            {
                ImageBrush LoginNevTextImageBrush = new ImageBrush();
                LoginNevTextImageBrush.ImageSource = new BitmapImage(new Uri(@"Images\fn.jpg", UriKind.Relative));
                LoginNevTextImageBrush.AlignmentX = AlignmentX.Left;
                LoginNevTextImageBrush.AlignmentY = AlignmentY.Center;
                LoginNevTextImageBrush.Stretch = Stretch.None;
                LoginNev.Background = LoginNevTextImageBrush;
            }
            else
            {
                LoginNev.Background = null;
            }

        }

        private void Jelszo_PasswordChanged(object sender, RoutedEventArgs e)
        {
            if (Jelszo.Password == "")
            {
                ImageBrush JelszoPasswordImageBrush = new ImageBrush();
                JelszoPasswordImageBrush.ImageSource = new BitmapImage(new Uri(@"Images\pw.jpg", UriKind.Relative));
                JelszoPasswordImageBrush.AlignmentX = AlignmentX.Left;
                JelszoPasswordImageBrush.AlignmentY = AlignmentY.Center;
                JelszoPasswordImageBrush.Stretch = Stretch.None;
                Jelszo.Background = JelszoPasswordImageBrush;
            }
            else
            {
                Jelszo.Background = null;
            }


        }

        private void Bejelentkezes_Click(object sender, RoutedEventArgs e)
        {
            probalkozasokSzama++;

            var salt = LoginService.GetSalt(Karbantarto.Menu.sharedClient, LoginNev.Text);
            if (salt != "" && salt != "Hiba")
            {
                string tmpHash = Menu.CreateSHA256(Jelszo.Password + salt);
                try
                {
                    //Menu.loggedUser = LoginUser(LoginNev.Text, tmpHash);
                    Menu.loggedUser = JsonSerializer.Deserialize<LoggedUser>(LoginService.Login(Karbantarto.Menu.sharedClient, LoginNev.Text, tmpHash));
                    if (Menu.loggedUser.token != "")
                    {
                        Menu.bejelentkezve = true;
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show(ex.Message);
                }
            }

            if (Menu.bejelentkezve)
            {
                this.Close();
                MessageBox.Show("Bejelentkezve: " + Menu.loggedUser.name);
            }
            else
            {
                if (probalkozasokSzama == 3)
                {
                    this.Close();
                    //Menu.bejelentkezve = false;
                    MessageBox.Show("Sikertelen bejelentkezés!");
                    //Application.Current.Shutdown();
                }
                else
                {
                    MessageBox.Show("Hibás név vagy jelszó!");
                }
            }
        }
    }
}
