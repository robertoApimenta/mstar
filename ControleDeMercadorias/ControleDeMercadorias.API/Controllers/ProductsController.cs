using ControleDeMercadorias.API.Entities;
using ControleDeMercadorias.API.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ControleDeMercadorias.API.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly MerchandiseControlDbContext _context;
        public ProductsController(MerchandiseControlDbContext context)
        {
            _context = context;
        }

        // api/products GET (Lista todos os produtos)
        [HttpGet]
        public IActionResult GetAll()
        {
            var products = _context.Products.Where(p => !p.IsDeleted).ToList();
            return Ok(products);
        }

        // api/products/123456789 GET (Lista o produto através do ID)
        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var product = _context.Products.SingleOrDefault(p => p.Id == id);

            if(product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // api/products POST (cadastra um novo produto)
        [HttpPost]
        public IActionResult Post(Product product)
        {
            _context.Products.Add(product);
            return CreatedAtAction(nameof(GetById), new { id = product.Id}, product);
        }

        // api/products/123456789 PUT (Edita os dados do produto através do ID)
        [HttpPut("{id}")]
        public IActionResult Update(Guid id, Product productInput)
        {
            var product = _context.Products.SingleOrDefault(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            product.Update(productInput.Name, productInput.Manufacturer, productInput.Type, productInput.Description, productInput.QuantityInStock);

            return NoContent();
        }

        // api/products/123456798 DELETE (Deleta um produto através do ID)
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var product = _context.Products.SingleOrDefault(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            product.Delete();

            return NoContent();
        }
    }
}
