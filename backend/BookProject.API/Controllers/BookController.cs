using BookProject.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SQLitePCL;

namespace BookProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDBContext _bookContext;
        public BookController(BookDBContext temp) => _bookContext = temp;


        public IEnumerable<Book> Get()
        {
            HttpContext.Response.Cookies.Append("pageSize", pageSize.ToString());

            var something = _bookContext.Books.ToList();
            return something;        
        }
    }
}
