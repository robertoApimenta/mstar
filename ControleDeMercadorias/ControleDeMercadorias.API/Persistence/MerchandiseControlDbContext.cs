using ControleDeMercadorias.API.Entities;

namespace ControleDeMercadorias.API.Persistence
{
    public class MerchandiseControlDbContext
    {
        public List<Product> Products { get; set; }
        public List<ProductEntry> ProductEntrys { get; set; }
        public List<ProductOutput> ProductOutputs { get; set; }

        public MerchandiseControlDbContext()
        {
            Products = new List<Product>();
            ProductEntrys = new List<ProductEntry>();
            ProductOutputs = new List<ProductOutput>();
        }
    }
}
