using mertyazilimtestAPI.Models;
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
    public class ShippersController : ApiController
    {
        // GET: Shippers
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/Shippers/GetShippers/")]
        public List<Shippers> GetShippers()
        {
            List<Shippers> list = new List<Shippers>();
            HttpClient client = new HttpClient();
            var result = client.GetAsync("https://northwind.now.sh/api/shippers").Result;
            if (result.IsSuccessStatusCode)
            {
                list = result.Content.ReadAsAsync<List<Shippers>>().Result;
            }

            return list;
        }
        // GET api/shippers/5
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/Shippers/GetShippersById/")]
        public Shippers GetShippersById(int id)
        {

            Shippers item = new Shippers();
            HttpClient client = new HttpClient();
            var result = client.GetAsync("https://northwind.now.sh/api/shippers/" + id.ToString() + "").Result;
            if (result.IsSuccessStatusCode)
            {
                item = result.Content.ReadAsAsync<Shippers>().Result;
            }

            return item;
        }

        [System.Web.Http.Route("api/Shippers/AddShippers/")]
        [System.Web.Http.HttpPost]
        public void AddShippers(Shippers shippers)
        {
            Shippers item = new Shippers();
            HttpClient client = new HttpClient();
            var content = new FormUrlEncodedContent(new[] {
                new KeyValuePair<string , string> ("companyName",shippers.companyName),
                new KeyValuePair<string , string> ("phone",shippers.phone),
            });
            var result = client.PostAsync("https://northwind.now.sh/api/shippers", content);

        }

        // PUT api/shippers/5
        [System.Web.Http.Route("api/Shippers/UpdateShippers/")]
        [System.Web.Http.HttpPut]
        public void UpdateShippers(Shippers shippers)
        {
            HttpClient client = new HttpClient();
            var content = new FormUrlEncodedContent(new[] {
                new KeyValuePair<string , string> ("companyName",shippers.companyName),
                new KeyValuePair<string , string> ("phone",shippers.phone),
            });
            client.PutAsync("https://northwind.now.sh/api/shippers/" + shippers.id.ToString() + "", content);

        }
        [System.Web.Http.Route("api/Shippers/DeleteShippers/")]
        // DELETE api/shippers/5
        [System.Web.Http.AcceptVerbs("DELETE")]
        public void DeleteShippers(int id)
        {
            HttpClient client = new HttpClient();
            client.DeleteAsync("https://northwind.now.sh/api/shippers/" + id.ToString() + "");
        }

    }
}