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
    public class ProductsController : ApiController
    {
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/Products/GetProducts/")]
        public List<Products> GetProducts()
        {
            List<Products> list = new List<Products>();
            HttpClient client = new HttpClient();
            var result = client.GetAsync("https://northwind.now.sh/api/products").Result;
            if (result.IsSuccessStatusCode)
            {
                list = result.Content.ReadAsAsync<List<Products>>().Result;
            }

            return list;
        }

        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/Products/GetProductsById/")]
        public Products GetProductsById(int id)
        {

            Products item = new Products();
            HttpClient client = new HttpClient();
            var result = client.GetAsync("https://northwind.now.sh/api/products/" + id.ToString() + "").Result;
            if (result.IsSuccessStatusCode)
            {
                item = result.Content.ReadAsAsync<Products>().Result;
            }

            return item;
        }
        [System.Web.Http.Route("api/Products/AddProducts/")]
        [System.Web.Http.HttpPost]
        public void AddProducts(Products products)
        {
            Products item = new Products();
            HttpClient client = new HttpClient();
            var content = new FormUrlEncodedContent(new[] {
                new KeyValuePair<string , string> ("name",products.name),
                new KeyValuePair<string , string> ("supplierId",products.supplierId.ToString()),
                new KeyValuePair<string , string> ("categoryId",products.categoryId.ToString()),
                new KeyValuePair<string , string> ("quantityPerUnit",products.quantityPerUnit),
                new KeyValuePair<string , string> ("unitPrice",products.unitPrice.ToString()),
                new KeyValuePair<string , string> ("unitsInStock",products.unitsInStock.ToString()),
            });
            var result = client.PostAsync("https://northwind.now.sh/api/products", content);

        }

        // PUT api/products/5
        [System.Web.Http.Route("api/Products/UpdateProducts/")]
        [System.Web.Http.HttpPut]
        public void UpdateProducts(Products products)
        {
            HttpClient client = new HttpClient();
            var content = new FormUrlEncodedContent(new[] {
                new KeyValuePair<string , string> ("name",products.name),
                new KeyValuePair<string , string> ("supplierId",products.supplierId.ToString()),
                new KeyValuePair<string , string> ("categoryId",products.categoryId.ToString()),
                new KeyValuePair<string , string> ("quantityPerUnit",products.quantityPerUnit),
                new KeyValuePair<string , string> ("unitPrice",products.unitPrice.ToString()),
                new KeyValuePair<string , string> ("unitsInStock",products.unitsInStock.ToString()),
            });
            client.PutAsync("https://northwind.now.sh/api/products/" + products.id.ToString() + "", content);

        }
        [System.Web.Http.Route("api/Products/DeleteProducts/")]
        // DELETE api/products/5
        [System.Web.Http.AcceptVerbs("DELETE")]
        public void DeleteProducts(int id)
        {
            HttpClient client = new HttpClient();
            client.DeleteAsync("https://northwind.now.sh/api/products/" + id.ToString() + "");
        }
    }
}