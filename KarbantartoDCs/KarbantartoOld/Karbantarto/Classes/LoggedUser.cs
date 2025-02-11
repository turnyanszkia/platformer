using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karbantarto.Classes
{
    public class LoggedUser
    {
        public string name { get; set; }

        public string email { get; set; }

        public int? permission { get; set; }

        public string profilePicturePath { get; set; }

        public string token { get; set; }
    }
}
