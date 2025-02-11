using System;
using System.Collections.Generic;
using System.IO;
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

namespace CastleLoginClient.UserManagement
{
    /// <summary>
    /// Interaction logic for Window1.xaml
    /// </summary>
    public partial class Window1 : Window
    {
        public HttpClient? client;
        public Window1()
        {
            InitializeComponent();
            string currentDir = Directory.GetCurrentDirectory();
            imgProfilkep.Source = new BitmapImage(new Uri())

        }

        private void ImagesSelect(object sender, RoutedEventArgs e)
        {

        }

        private async void SaveClick(object sender, RoutedEventArgs e)
        {
            if
        }

        private void CancelClick(object sender, RoutedEventArgs e)
        {

        }
    }
}
