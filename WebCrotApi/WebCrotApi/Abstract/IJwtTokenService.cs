using WebCrotApi.Data.Entities.Identity;

namespace WebCrotApi.Abstract;

public interface IJwtTokenService
{
    Task<string> CreateTokenAsync(UserEntity user);
}
