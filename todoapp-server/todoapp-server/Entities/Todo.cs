using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace todoapp_server.Entities
{
    
    public class Todo
    {
        
        public int Id { get; set; }
        
        public string TodoNote { get; set; }

        public AppUser AppUser { get; set; }

        public string AppUserId { get; set; }
    }
}
