using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace todoapp_server.Entities
{
    public class AppUser : IdentityUser
    {
        public ICollection<Todo> Todos { get; set; }
    }
}
