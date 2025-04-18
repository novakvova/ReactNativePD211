using AutoMapper;
using WebCrotApi.Data.Entities.Identity;
using WebCrotApi.Models.Account;

namespace WebCrotApi.Mapper;

public class AccountMapper : Profile
{
    public AccountMapper()
    {
        CreateMap<RegisterViewModel, UserEntity>()
            .ForMember(x=>x.UserName, opt=>opt.MapFrom(x=>x.Email));
    }
}
