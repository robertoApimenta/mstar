using ControleDeMercadorias.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace ControleDeMercadorias.API.Persistence
{
    public class MerchandiseControlDbContext : DbContext
    {
        public MerchandiseControlDbContext(DbContextOptions<MerchandiseControlDbContext> options) : base(options)
        {
            
        }
        
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductEntry> ProductEntrys { get; set; }
        public DbSet<ProductOutput> ProductOutputs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(e =>
            {
                e.HasKey(p => p.Id);

                e.Property(p => p.Name)
                    .HasMaxLength(20)
                    .HasColumnType("varchar(20)")
                    .HasColumnName("name");

                e.Property(p => p.Manufacturer)
                    .HasMaxLength(20)
                    .HasColumnType("varchar(20)")
                    .HasColumnName("manufacturer");

                e.Property(p => p.Type)
                    .HasMaxLength(20)
                    .HasColumnType("varchar(20)")
                    .HasColumnName("type");

                e.Property(p => p.Description)
                    .HasMaxLength(200)
                    .HasColumnType("varchar(200)")
                    .HasColumnName("description");

                e.Property(p => p.QuantityInStock)
                    .HasColumnType("integer")
                    .HasColumnName("quantity_in_stock");

                e.Property(p => p.IsDeleted)
                    .HasColumnType("bit")
                    .HasColumnName("is_required");
            });

            modelBuilder.Entity<ProductEntry>(e =>
            {
                e.HasKey(p => p.Id);

                e.Property(p => p.Quantity)
                    .HasColumnType("integer")
                    .HasColumnName("quantity");

                e.Property(p => p.DateEntry)
                    .HasColumnType("datetime")
                    .HasColumnName("date_entry");

                e.HasOne<Product>()
                    .WithMany()
                    .HasForeignKey(p => p.ProductId);
            });

            modelBuilder.Entity<ProductOutput>(e =>
            {
                e.HasKey(p => p.Id);

                e.Property(p => p.Quantity)
                    .HasColumnType("integer")
                    .HasColumnName("quantity");

                e.Property(p => p.DateOutput)
                    .HasColumnType("datetime")
                    .HasColumnName("date_output");

                e.HasOne<Product>()
                    .WithMany()
                    .HasForeignKey(p => p.ProductId);
            });
        }
    }
}
