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


        public IActionResult Get(int pageHowMany = 5, int pageNum = 1, bool sortByTitle = false, string sortDirection = "asc")
        {
            
            var query = _bookContext.Books.AsQueryable();
            
            
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
    }
}
