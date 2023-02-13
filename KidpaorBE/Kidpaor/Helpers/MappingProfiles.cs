using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Kidpaor.Dtos;

namespace Kidpaor.Helpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Product, ProductToReturnDto>()
            .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
            .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name));
        CreateMap<Address, AddressDto>().ReverseMap();
    }
}