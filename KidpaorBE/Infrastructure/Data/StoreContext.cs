using System.Reflection;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class StoreContext: DbContext
{
    public StoreContext(DbContextOptions<StoreContext> options) : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
    public DbSet<ProductBrand> ProductsBrands { get; set; }
    public DbSet<ProductType> ProductsTypes { get; set; }
    public DbSet<Activities> Activities { get; set; }
    public DbSet<ActivitiesCategories> ActivitiesCategories { get; set; }
    public DbSet<Organizers> Organizers { get; set; }
    public DbSet<Parents> Parents { get; set; }
    public DbSet<Kids> Kids { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}