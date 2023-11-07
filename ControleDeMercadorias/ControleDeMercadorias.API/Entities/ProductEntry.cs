namespace ControleDeMercadorias.API.Entities
{
    public class ProductEntry
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public DateTime DataEntry { get; set; }
    }
}
