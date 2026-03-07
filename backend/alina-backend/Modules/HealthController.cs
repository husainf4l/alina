using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace alina_backend.Modules;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    private readonly AppDbContext _context;

    public HealthController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Health check endpoint
    /// </summary>
    [HttpGet]
    public IActionResult GetHealth()
    {
        return Ok(new
        {
            status = "healthy",
            timestamp = DateTime.UtcNow,
            service = "alina-backend"
        });
    }

    /// <summary>
    /// Database connectivity test
    /// </summary>
    [HttpGet("/api/debug/db-test")]
    public async Task<IActionResult> DbTest()
    {
        try
        {
            var canConnect = await _context.Database.CanConnectAsync();
            return Ok(new { success = canConnect });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message, type = ex.GetType().Name });
        }
    }
}