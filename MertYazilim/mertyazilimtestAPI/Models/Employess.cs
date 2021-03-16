using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace mertyazilimtestAPI.Models
{
    public class Employess
    {
        public int id { get; set; }
        public string lastName { get; set; }
        public string firstName { get; set; }
        public string title { get; set; }
        public string titleOfCourtesy { get; set; }
        public Address address { get; set; }
      
    }
    public class Address
    {
        public string phone { get; set; }
    }

}