namespace ControleDeMercadorias.API.Entities
{
    public class ProductOutput
    {
        public Guid Id { get; set; }
        public string Quantity { get; set; }
        public DateTime DataOutput { get; set; }
    }
}
