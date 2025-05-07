using AutoMapper;
using WebCrotApi.Data.Entities;
using WebCrotApi.Models.Category;

namespace WebCrotApi.Mapper;

public class CategoryMapper : Profile
{
    public CategoryMapper()
    {
        CreateMap<CategoryEntity, CategoryItemViewModel>();

        CreateMap<CategoryCreateViewModel, CategoryEntity>()
            .ForMember(opt=>opt.Image, x=>x.Ignore());

        CreateMap<CategoryEditViewModel, CategoryEntity>()
            .ForMember(opt => opt.Image, x => x.Ignore());
    }
}
