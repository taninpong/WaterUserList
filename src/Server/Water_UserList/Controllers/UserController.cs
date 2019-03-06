using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Water_UserList.Models;

namespace Water_UserList.Controllers
{
    [Route("[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMongoClient client;
        private readonly IMongoDatabase database;
        private readonly IMongoCollection<User> UserCollection;

        public UserController()
        {
            client = new MongoClient("mongodb://thes:zk70NWOArstd28WKZzMzecE0qF9fYD8TD89SMkLt9jbRuaCSFyNDBkP1lS2SbxVbDXvtzTuuKHphEZS5fBDifg==@thes.documents.azure.com:10255/NSOGroup1?ssl=true&replicaSet=globaldb");
            database = client.GetDatabase("NSOGroup1");
            var userCollectionName = "User";
            UserCollection = database.GetCollection<User>(userCollectionName);
        }
        
        [HttpGet]
        public ActionResult<IEnumerable<User>> user()
        {
            var result = UserCollection.Find(it => true).ToList();
            return result;
        }

        [HttpGet]
        public ActionResult<IEnumerable<User>> userlower_role_area(string TID, string CWT)
        {
            var result = UserCollection.Find(it => it.CWT == CWT && it.TID == TID).ToList();
            return result;
        }

        [HttpPut]
        public void insert_user([FromBody] User data)
        {
            data._id = Guid.NewGuid().ToString();
            UserCollection.InsertOne(data);
        }
    }
}