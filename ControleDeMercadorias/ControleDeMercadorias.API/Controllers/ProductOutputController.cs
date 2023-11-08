using ControleDeMercadorias.API.Entities;
using ControleDeMercadorias.API.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleDeMercadorias.API.Controllers
{
    [Route("api/product-output")]
    [ApiController]
    public class ProductOutputController : ControllerBase
    {
        private readonly MerchandiseControlDbContext _context;

        public ProductOutputController(MerchandiseControlDbContext context)
        {
            _context = context;

        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var productsOutput = _context.ProductOutputs
                .ToList();
            return Ok(productsOutput);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var productOutput = _context.ProductOutputs
                .SingleOrDefault(p => p.Id == id);
            if (productOutput == null)
            {
                return NotFound();
            }
            return Ok(productOutput);
        }

        [HttpPost]
        public IActionResult Post(ProductOutput productOutput)
        {
            _context.ProductOutputs.Add(productOutput);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = productOutput.Id }, productOutput);
        }
    }
}
