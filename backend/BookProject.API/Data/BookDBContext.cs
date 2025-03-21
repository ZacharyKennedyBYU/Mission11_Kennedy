using Microsoft.EntityFrameworkCore;

namespace BookProject.API.Data
{
    public class BookDBContext : DbContext
    {
        public BookDBContext(DbContextOptions<BookDBContext> options) : base(options) 
        {

        }

        public DbSet<Book> Books { get; set; }
    }
}
