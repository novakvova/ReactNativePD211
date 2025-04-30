using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebCrotApi.Data;
using WebCrotApi.Data.Entities.Identity;
using WebCrotApi.Models.Category;

namespace WebCrotApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class CategoriesController(IMapper mapper,
    WebCrtopDbContext context, UserManager<UserEntity> userManager) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetList()
    {
        try
        {
            string userName = User.Claims.FirstOrDefault().Value;
            var user = await userManager.FindByEmailAsync(userName);
            var list = context.Categories
                .Where(x=>x.UserId==user.Id)
                .ProjectTo<CategoryItemViewModel>(mapper.ConfigurationProvider)
                .ToList();
            return Ok(list);
        }
        catch (Exception ex)
        {
            return BadRequest(new
            {
                invalid = ex.Message
            });
        }
    } 
}
