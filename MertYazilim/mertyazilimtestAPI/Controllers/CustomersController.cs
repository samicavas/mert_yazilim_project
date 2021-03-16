using mertyazilimtestAPI.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;

namespace mertyazilimtestAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class CustomersController : ApiController
    {
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/Customers/GetCustomers/")]
        public List<Customers> GetCustomers()
        {
            List<Customers> list = new List<Customers>();
            HttpClient client = new HttpClient();
            var result = client.GetAsync("https://northwind.now.sh/api/customers").Result;
            if (result.IsSuccessStatusCode)
            {
                list = result.Content.ReadAsAsync<List<Customers>>().Result;
            }

            return list;
        }
        // GET api/customers/5
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/Customers/GetCustomersById/")]
        public Customers GetCustomersById(string id)
        {

            Customers item = new Customers();
            HttpClient client = new HttpClient();
            var result = client.GetAsync("https://northwind.now.sh/api/customers/" + id + "").Result;
            if (result.IsSuccessStatusCode)
            {
                item = result.Content.ReadAsAsync<Customers>().Result;
            }

            return item;
        }

        [System.Web.Http.Route("api/Customers/AddCustomers/")]
        [System.Web.Http.HttpPost]
        public void AddCustomers(Customers customers)
        {
            var addres = new JObject();
            addres.Add("phone", customers.address.phone);
            var values = new JObject();
            values.Add("id", customers.id);
            values.Add("companyName", customers.companyName);
            values.Add("contactName", customers.contactName);
            values.Add("contactTitle", customers.contactTitle);
            values.Add("address", addres);
            HttpClient client = new HttpClient();
            client.PostAsJsonAsync("https://northwind.now.sh/api/customers", values);

        }

        // PUT api/customers/5
        [System.Web.Http.Route("api/Customers/UpdateCustomers/")]
        [System.Web.Http.HttpPut]
        public void UpdateCustomers(Customers customers)
        {
            var addres = new JObject();
            addres.Add("phone", customers.address.phone);
            var values = new JObject();
            values.Add("companyName", customers.companyName);
            values.Add("contactName", customers.contactName);
            values.Add("contactTitle", customers.contactTitle);
            values.Add("address", addres);
            HttpClient client = new HttpClient();
            client.PutAsJsonAsync("https://northwind.now.sh/api/customers/" + customers.id + "", values);

        }
        [System.Web.Http.Route("api/Customers/DeleteCustomers/")]
        // DELETE api/customers/5
        [System.Web.Http.AcceptVerbs("DELETE")]
        public void DeleteCustomers(string id)
        {
            HttpClient client = new HttpClient();
            client.DeleteAsync("https://northwind.now.sh/api/customers/" + id + "");
        }
    }
}