namespace ControleDeMercadorias.API.Entities
{
    public class ProductEntry
    {
        public Guid Id { get; set; }
        public string Quantity { get; set; }
        public DateTime DataEntry { get; set; }
    }
}
