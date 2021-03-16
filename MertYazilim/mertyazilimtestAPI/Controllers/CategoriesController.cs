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

    public class CategoriesController : ApiController
    {
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/Categories/GetCategories/")]
        public List<Categories> GetCategories()
        {
            List<Categories> list = new List<Categories>();
            HttpClient client = new HttpClient();
            var result = client.GetAsync("https://northwind.now.sh/api/categories").Result;
            if (result.IsSuccessStatusCode)
            {
                list = result.Content.ReadAsAsync<List<Categories>>().Result;
            }

            return list;
        }
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/Categories/GetCategoriesById/")]
        public Categories GetCategoriesById(int id)
        {

            Categories item = new Categories();
            HttpClient client = new HttpClient();
            var result = client.GetAsync("https://northwind.now.sh/api/categories/" + id.ToString() + "").Result;
            if (result.IsSuccessStatusCode)
            {
                item = result.Content.ReadAsAsync<Categories>().Result;
            }

            return item;
        }

        [System.Web.Http.Route("api/Categories/AddCategories/")]
        [System.Web.Http.HttpPost]
        public void AddCategories(Categories categories)
        {
            Categories item = new Categories();
            HttpClient client = new HttpClient();
            var content = new FormUrlEncodedContent(new[] {
                new KeyValuePair<string , string> ("name",categories.name),
                new KeyValuePair<string , string> ("description",categories.description),
            });
            var result = client.PostAsync("https://northwind.now.sh/api/categories", content);

        }

        // PUT api/categories/5
        [System.Web.Http.Route("api/Categories/UpdateCategories/")]
        [System.Web.Http.HttpPut]
        public void UpdateCategories(Categories categories)
        {
            HttpClient client = new HttpClient();
            var content = new FormUrlEncodedContent(new[] {
                new KeyValuePair<string , string> ("name",categories.name),
                new KeyValuePair<string , string> ("description",categories.description),
            });
            client.PutAsync("https://northwind.now.sh/api/categories/" + categories.id.ToString() + "", content);

        }
        [System.Web.Http.Route("api/Categories/DeleteCategories/")]
        // DELETE api/categories/5
        [System.Web.Http.AcceptVerbs("DELETE")]
        public void DeleteCategories(int id)
        {
            HttpClient client = new HttpClient();
            client.DeleteAsync("https://northwind.now.sh/api/categories/" + id.ToString() + "");
        }
    }
}