using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace mertyazilimtestAPI.Models
{
    public class Customers
    {
        public string id { get; set; }
        public string companyName { get; set; }
        public string contactName { get; set; }
        public string contactTitle { get; set; }
        public CustomersAddress address { get; set; }

    }
    public class CustomersAddress
    {
        public string phone { get; set; }
    }
}