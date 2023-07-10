using Microsoft.AspNetCore.Mvc;

namespace UploadFiles.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private IWebHostEnvironment _enviorment;
        public FileController(IWebHostEnvironment environment)
        {
            _enviorment = environment;
        }

        [HttpPost]
        public async Task<IActionResult> UploadFiles([FromForm] List<IFormFile> files)
        {
            try
            {
                if (files == null || files.Count == 0)
                {
                    return Ok("No File Found");
                }

                var fileSizeLimit = 20 * 1024 * 1024; // 20 MB in bytes
                var fileNames = new List<string>();

                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        if (file.Length > fileSizeLimit)
                        {
                            return BadRequest("File size exceeds the limit of 20 MB.");
                        }

                        string fileName = file.FileName;
                        string filePath = Path.Combine(_enviorment.ContentRootPath, "UploadedFiles", fileName);
                        string fileExtension = Path.GetExtension(file.FileName);

                        var allowedExtensions = new[] { ".txt", ".doc", ".docx", ".pdf" };
                        if (!allowedExtensions.Contains(fileExtension.ToLower()))
                        {
                            return BadRequest("Invalid file extension.");
                        }

                        if (System.IO.File.Exists(filePath))
                        {
                            return BadRequest("Error: File already exists.");
                        }

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }

                        fileNames.Add(fileName);
                    }
                }

                return Ok(fileNames);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }



    }
}
