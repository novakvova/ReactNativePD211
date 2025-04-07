using Microsoft.AspNetCore.Identity;

namespace WebCrotApi.Data.Entities.Identity;

public class RoleEntity : IdentityRole<long>
{
    public virtual ICollection<UserRoleEntity>? UserRoles { get; set; }
}
