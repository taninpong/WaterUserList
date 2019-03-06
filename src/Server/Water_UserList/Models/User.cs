using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Water_UserList.Models
{
    public class User
    {
        [BsonId]
        public string _id { get; set; }
        public string USERID { get; set; }
        public string FIRSTNAME { get; set; }
        public string LASTNAME { get; set; }
        public string EMAIL { get; set; }
        public string PHONE { get; set; }
        public string PASSWORD { get; set; }
        public string TITLE { get; set; }
        public string SSN { get; set; }
        public string TID { get; set; }
        public string TYPE_NAME { get; set; }
        public string CWT { get; set; }
        public string CWT_NAME { get; set; }
        public bool STATUS { get; set; }
        public int __v { get; set; }
    }
}
