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

    public class SuppliersController : ApiController
    {
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/Suppliers/GetSuppliers/")]
        public List<Suppliers> GetSuppliers()
        {
            List<Suppliers> list = new List<Suppliers>();
            HttpClient client = new HttpClient();
            var result = client.GetAsync("https://northwind.now.sh/api/suppliers").Result;
            if (result.IsSuccessStatusCode)
            {
                list = result.Content.ReadAsAsync<List<Suppliers>>().Result;
            }

            return list;
        }
        // GET api/suppliers/5
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/Suppliers/GetSuppliersById/")]
        public Suppliers GetESuppliersById(int id)
        {

            Suppliers item = new Suppliers();
            HttpClient client = new HttpClient();
            var result = client.GetAsync("https://northwind.now.sh/api/suppliers/" + id.ToString() + "").Result;
            if (result.IsSuccessStatusCode)
            {
                item = result.Content.ReadAsAsync<Suppliers>().Result;
            }

            return item;
        }

        [System.Web.Http.Route("api/Suppliers/AddSuppliers/")]
        [System.Web.Http.HttpPost]
        public void AddSuppliers(Suppliers suppliers)
        {
            var addres = new JObject();
            addres.Add("phone", suppliers.address.phone);
            var values = new JObject();
            values.Add("companyName", suppliers.companyName);
            values.Add("contactName", suppliers.contactName);
            values.Add("contactTitle", suppliers.contactTitle);
            values.Add("address", addres);
            HttpClient client = new HttpClient();
            
            client.PostAsJsonAsync("https://northwind.now.sh/api/suppliers", values);

        }

        // PUT api/suppliers/5
        [System.Web.Http.Route("api/Suppliers/UpdateSuppliers/")]
        [System.Web.Http.HttpPut]
        public void UpdateSuppliers(Suppliers suppliers)
        {
            var addres = new JObject();
            addres.Add("phone", suppliers.address.phone);
            var values = new JObject();
            values.Add("companyName", suppliers.companyName);
            values.Add("contactName", suppliers.contactName);
            values.Add("contactTitle", suppliers.contactTitle);
            values.Add("address", addres);
            HttpClient client = new HttpClient();
            client.PutAsJsonAsync("https://northwind.now.sh/api/suppliers/" + suppliers.id.ToString() + "", values);
            
        }
        [System.Web.Http.Route("api/Suppliers/DeleteSuppliers/")]
        // DELETE api/suppliers/5
        [System.Web.Http.AcceptVerbs("DELETE")]
        public void DeleteSuppliers(int id)
        {
            HttpClient client = new HttpClient();
            client.DeleteAsync("https://northwind.now.sh/api/suppliers/" + id.ToString() + "");
        }
    }
    }