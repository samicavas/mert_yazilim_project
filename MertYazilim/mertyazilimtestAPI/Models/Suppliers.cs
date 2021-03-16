using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace mertyazilimtestAPI.Models
{
    public class Suppliers
    {
        public int id { get; set; }
        public string companyName { get; set; }
        public string contactName { get; set; }
        public string contactTitle { get; set; }
        public SuppliersAddress address { get; set; }
    }
    public class SuppliersAddress
    {
        public string phone { get; set; }
    }
}