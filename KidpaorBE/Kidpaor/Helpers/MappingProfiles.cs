using AutoMapper;
using Core.Entities;
using Kidpaor.Dtos;

namespace Kidpaor.Helpers;

public class MappingProfiles : Profile
{
    private MappingProfiles()
    {
        CreateMap<Product, ProductToReturnDto>()
            .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
            .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
            .ForMember(d => d.PictureUrl, o => o.MapFrom<ProductUrlResolver>());
    }

}