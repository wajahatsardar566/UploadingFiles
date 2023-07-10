using Microsoft.EntityFrameworkCore;
using UploadFiles.Model;

namespace UploadFiles.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<FileModel> Files { get; set; }
    }
}
