using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using todoapp_server.Entities;

namespace todoapp_server.Interface
{
   public interface ITokenService
    {
        string CreateToken(AppUser user);

    }
}
