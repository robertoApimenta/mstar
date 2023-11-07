using ControleDeMercadorias.API.Entities;
using ControleDeMercadorias.API.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ControleDeMercadorias.API.Controllers
{
    [Route("api/product-entry")]
    [ApiController]
    public class ProductEntryController : ControllerBase
    {
        private readonly MerchandiseControlDbContext _context;

        public ProductEntryController(MerchandiseControlDbContext context)
        {
            _context = context;
            
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var productsEntry = _context.ProductEntrys.ToList();
            return Ok(productsEntry);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var productEntry = _context.ProductEntrys.SingleOrDefault(p => p.Id == id);
            if(productEntry == null) 
            {
                return NotFound();    
            }
            return Ok(productEntry);
        }

        [HttpPost]
        public IActionResult Post(ProductEntry productEntry)
        {
            _context.ProductEntrys.Add(productEntry);

            return CreatedAtAction(nameof(GetById), new {id = productEntry.Id}, productEntry);
        }
    }
}
