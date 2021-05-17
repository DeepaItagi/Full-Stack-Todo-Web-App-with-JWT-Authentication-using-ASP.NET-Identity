using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using todoapp_server.Data;
using todoapp_server.Interface;
using todoapp_server.Entities;
using todoapp_server.DTOs;
using Microsoft.AspNetCore.Identity;
using AutoMapper;

namespace todoapp_server.Controllers
{
  
    public class AccountController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly SignInManager<AppUser> _signInManager;

        public AccountController(ITokenService tokenService, UserManager<AppUser> userManager, IMapper mapper, SignInManager<AppUser> signInManager)
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _mapper = mapper;
            _signInManager = signInManager;
        }


        /// <summary>
        /// Registers a new user with the given user data. After successful registration, JWT is returned.
        /// </summary>
       
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");

            var user = _mapper.Map<AppUser>(registerDto);

            user.UserName = registerDto.Username.ToLower();

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            
            if (!result.Succeeded) return BadRequest(result.Errors);

            return new UserDto
            {
                Username = user.UserName,
                Token =  _tokenService.CreateToken(user),
          
            };


        }


        /// <summary>
        ///  Logs in registered user.
        /// </summary>

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                .SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if (user == null) return Unauthorized("Invalid username");

            var result = await _signInManager
                .CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized();

            return new UserDto
            {
                Username = user.UserName,
                Token =  _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string username)
        { return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower()); }
    }
}
