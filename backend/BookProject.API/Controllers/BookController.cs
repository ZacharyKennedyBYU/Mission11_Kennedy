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

        [HttpGet("AllProjects")]
        public IActionResult Get(int pageHowMany = 5, int pageNum = 1, bool sortByTitle = true, string sortDirection = "asc", [FromQuery] List<string>? bookTypes = null)
        {
            
            var query = _bookContext.Books.AsQueryable();
            
            if (bookTypes !=null)
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }

            if (sortByTitle)
            {
                if (sortDirection.ToLower() == "desc")
                {
                    query = query.OrderByDescending(b => b.Title);
                }
                else
                {
                    query = query.OrderBy(b => b.Title);
                }
            }

            
            var totalNumBooks = query.Count();

            
            var books = query
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();

            BookListData response = new BookListData
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            };
            
            return Ok(response);
        }
        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes ()
        {
            var bookTypes = _bookContext.Books
                .Select(p => p.Category)
                .Distinct()
                .ToList();

            return Ok(bookTypes);
        }
    }
}
