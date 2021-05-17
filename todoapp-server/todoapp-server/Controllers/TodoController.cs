using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using todoapp_server.Interface;
using todoapp_server.Entities;
using todoapp_server.DTOs;
using Microsoft.AspNetCore.Identity;
using AutoMapper;
using Microsoft.Extensions.Logging;
using todoapp_server.Data;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace todoapp_server.Controllers
{
   
    [Authorize]
    public class TodoController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly PostgreSqlContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;


        public TodoController(UserManager<AppUser> userManager,
            PostgreSqlContext context,
            IMapper mapper,
            ILogger<TodoController> logger)
        {
            _userManager = userManager;
            _context = context;
            _mapper = mapper;
            _logger = logger;

        }

        /// <summary>
        /// Lists all the todo items which was added to the current user.
        /// JWT needed in request header.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoDto>>> GetTodos()
        {
            var CurrentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var CurrentUser = await _userManager.Users
                                                .Include(u => u.Todos)
                                                .SingleAsync(u => u.Id == CurrentUserId);
     

            var todos = CurrentUser.Todos.ToList();
            if (todos == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map < List<Todo>, List<TodoDto>>(todos));
        }

        /// <summary>
        ///  Displays the todo item of the current user whose item id was added to request path.
        /// JWT needed in request header.
        /// </summary>

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoDto>> GetTodo([FromRoute] int id)
        {
            var CurrentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var CurrentUser = await _userManager.Users
                                                .Include(u => u.Todos)
                                                .SingleAsync(u => u.Id == CurrentUserId);

            var todo = CurrentUser.Todos.Single(t => t.Id == id);

            if (todo == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<TodoDto>(todo));
        }

        /// <summary>
        ///  Creates a new todo item for the current user with the data given in the request body.
        /// JWT needed in request header.
        /// </summary>
      
        [HttpPost]
        public async Task<ActionResult<TodoDto>> AddTodo([FromBody] TodoDto todoDto)
        {
            var CurrentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var CurrentUser = await _userManager.Users
                                                .Include(u => u.Todos)
                                                .SingleAsync(u => u.Id == CurrentUserId);

            var todo = _mapper.Map<Todo>(todoDto);

            CurrentUser.Todos.Add(todo);
            await _userManager.UpdateAsync(CurrentUser);

            return CreatedAtAction("GetTodoItem", new { id = todo.Id }, _mapper.Map<TodoDto>(todo));
        }

        /// <summary>
        /// Modifies the todo item of the current user whose item id was added to request path with the data given in the request body.
        /// JWT needed in request header.
        /// </summary>
       
        [HttpPut("{id}")]
        public async Task<ActionResult<TodoDto>>  EditTodo([FromRoute] int id, [FromBody] TodoDto todoDto)
        {


            var CurrentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var CurrentUser = await _userManager.Users
                                                .Include(u => u.Todos)
                                                .SingleAsync(u => u.Id == CurrentUserId);

            if (id != todoDto.Id)
            {
                return BadRequest(); 
            }

            Todo todo= CurrentUser.Todos.Single(t => t.Id == id);

            if (todo == null)
            {
                return NotFound(); ;
            }

            todo.TodoNote = todoDto.TodoNote;

            _context.Entry(todo).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<TodoDto>(todo));
        }

        /// <summary>
        ///  Deletes the todo item of the current user whose item id was added to request path.
        /// JWT needed in request header.
        /// </summary>
       
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTodo([FromRoute] int id)
        {
            var CurrentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var CurrentUser = await _userManager.Users
                                                .Include(u => u.Todos)
                                                .SingleAsync(u => u.Id == CurrentUserId);

            var todo = CurrentUser.Todos.Single(t => t.Id == id);

            if (todo == null)
            {
                return NotFound();
            }

            CurrentUser.Todos.Remove(todo);
            await _userManager.UpdateAsync(CurrentUser);

            return Ok();
        }
    }
}
