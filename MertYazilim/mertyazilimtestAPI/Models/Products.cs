using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace mertyazilimtestAPI.Models
{
    public class Products
    {

        public Int32 id { get; set; }
        public String name { get; set; }
        public Int32 supplierId { get; set; }
        public Int32 categoryId { get; set; }
        public String quantityPerUnit { get; set; }
        public Double unitPrice { get; set; }
        public Int32 unitsInStock { get; set; }

    }
}