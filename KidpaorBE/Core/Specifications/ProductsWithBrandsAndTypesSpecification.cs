using Core.Entities;

namespace Core.Specifications;

public class ProductsWithBrandsAndTypesSpecification : BaseSpecification<Product>
{
    public ProductsWithBrandsAndTypesSpecification()
    {
        AddInclude(x => x.ProductBrand);
        AddInclude(x => x.ProductType);
    }

    public ProductsWithBrandsAndTypesSpecification(int id) : base(x => x.Id == id)
    {
        AddInclude(x => x.ProductBrand);
        AddInclude(x => x.ProductType);
    }
}