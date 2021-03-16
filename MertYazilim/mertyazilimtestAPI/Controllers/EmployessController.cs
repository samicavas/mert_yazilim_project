using mertyazilimtestAPI.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;

namespace mertyazilimtestAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EmployessController : ApiController
    {
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/Employess/GetEmployess/")]
        public List<Employess> GetEmployess()
        {
            List<Employess> list = new List<Employess>();
            HttpClient client = new HttpClient();
            var result = client.GetAsync("https://northwind.now.sh/api/employess").Result;
            if (result.IsSuccessStatusCode)
            {
                list = result.Content.ReadAsAsync<List<Employess>>().Result;
            }

            return list;
        }
        // GET api/employess/5
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/Employess/GetEmployessById/")]
        public Employess GetEmployessById(int id)
        {

            Employess item = new Employess();
            HttpClient client = new HttpClient();
            var result = client.GetAsync("https://northwind.now.sh/api/employess/"+id.ToString()+"").Result;
            if (result.IsSuccessStatusCode)
            {
                item = result.Content.ReadAsAsync<Employess>().Result;
            }

            return item;
        }

        [System.Web.Http.Route("api/Employess/AddEmployess/")]
        [System.Web.Http.HttpPost]
        public void AddEmployess(Employess employess)
        {
            
            var addres = new JObject();
            addres.Add("phone", employess.address.phone);
            var values = new JObject();
            values.Add("lastName", employess.lastName);
            values.Add("firstName", employess.firstName);
            values.Add("title", employess.title);
            values.Add("titleOfCourtesy", employess.titleOfCourtesy);
            values.Add("address", addres);
            HttpClient client = new HttpClient();
            var result = client.PostAsJsonAsync("https://northwind.now.sh/api/employess", values);
           
        }

        // PUT api/employess/5
        [System.Web.Http.Route("api/Employess/UpdateEmployess/")]
        [System.Web.Http.HttpPut]

        public void UpdateEmployess(Employess employess)
        {

            var addres = new JObject();
            addres.Add("phone", employess.address.phone);
            var values = new JObject();
            values.Add("lastName", employess.lastName);
            values.Add("firstName", employess.firstName);
            values.Add("title", employess.title);
            values.Add("titleOfCourtesy", employess.titleOfCourtesy);
            values.Add("address", addres);
            HttpClient client = new HttpClient();
            client.PutAsJsonAsync("https://northwind.now.sh/api/employess/"+ employess.id.ToString() + "", values);

        }
        [System.Web.Http.Route("api/Employess/DeleteEmployess/")]
        // DELETE api/employess/5
        [System.Web.Http.AcceptVerbs("DELETE")]
        public void DeleteEmployess(int id)
        {
            HttpClient client = new HttpClient();
            client.DeleteAsync("https://northwind.now.sh/api/employess/" + id.ToString() + "");
        }
    }
}
