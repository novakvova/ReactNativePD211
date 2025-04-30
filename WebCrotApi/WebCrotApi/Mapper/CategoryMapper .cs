using AutoMapper;
using WebCrotApi.Data.Entities;
using WebCrotApi.Models.Category;

namespace WebCrotApi.Mapper;

public class CategoryMapper : Profile
{
    public CategoryMapper()
    {
        CreateMap<CategoryEntity, CategoryItemViewModel>();
    }
}
