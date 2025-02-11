using System.Configuration;
using System.Data;
using System.Windows;
using Karbantarto.Windows;

namespace Karbantarto
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        private void Login(object sender, StartupEventArgs e)
        {
            Login login = new Login();
            Application.Current.MainWindow = login;
            Menu menu = new Menu();
            login.ShowDialog();
            if (Karbantarto.Menu.bejelentkezve)
            {
                //menu.mnu_dat_Felh.Visibility = Visibility.Hidden;
                if (Menu.loggedUser.permission == 9)
                {
                    menu.mnu_dat_Felh.IsEnabled = true;
                }
                else
                {
                    menu.mnu_dat_Felh.IsEnabled = false;
                }

                    menu.Show();
                menu.fomenu.Title = "Karbantartó rendszer\t\tBejelentkezve: " + Karbantarto.Menu.loggedUser.name;
            }
        }
    }

}
