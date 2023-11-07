namespace ControleDeMercadorias.API.Entities
{
    public class Product
    {
        public Product()
        {
            IsDeleted = false;
            QuantityInStock = 0;
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Manufacturer { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public int QuantityInStock { get; set; }
        public bool IsDeleted { get; set; }

        public void Update(string name, string manufacturer, string type, string description, int quantityinstock)
        {
            Name = name;
            Manufacturer = manufacturer;
            Type = type;
            Description = description;
            QuantityInStock = quantityinstock;
        }

        public void Delete()
        {
            IsDeleted = true;
        }
    }
}
