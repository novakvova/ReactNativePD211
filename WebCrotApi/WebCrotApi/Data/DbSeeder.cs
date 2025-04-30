using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Text;
using WebCrotApi.Abstract;
using WebCrotApi.Constants;
using WebCrotApi.Data.Entities;
using WebCrotApi.Data.Entities.Identity;
using WebCrotApi.Models.Seeder;

namespace WebCrotApi.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(this WebApplication webApplication)
    {
        using var scope = webApplication.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<WebCrtopDbContext>();

        context.Database.Migrate(); //Запускає команду автоматично Update-Database

        if (!context.Roles.Any())
        {
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<RoleEntity>>();
            await roleManager.CreateAsync(new() { Name = Roles.Admin });
            await roleManager.CreateAsync(new() { Name = Roles.User });
        }

        if (!context.Users.Any())
        {
            var imageService = scope.ServiceProvider.GetRequiredService<IImageService>();
            var jsonFile = Path.Combine(Directory.GetCurrentDirectory(), "Helpers", "JsonData", "Users.json");
            if (File.Exists(jsonFile))
            {
                var jsonData = File.ReadAllText(jsonFile, Encoding.UTF8);
                try
                {
                    var users = JsonConvert.DeserializeObject<List<SeederUserModel>>(jsonData)
                        ?? throw new JsonException();
                    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<UserEntity>>();
                    foreach (var user in users)
                    {
                        var newUser = new UserEntity
                        {
                            UserName = user.Email,
                            PhoneNumber = user.PhoneNumber,
                            Email = user.Email,
                            Firstname = user.Firstname,
                            Lastname = user.Lastname,
                            Image = await imageService.SaveImageFromUrlAsync(user.Image)
                        };
                        var result = await userManager.CreateAsync(newUser, user.Password);
                        if (result.Succeeded)
                        {
                            await userManager.AddToRoleAsync(newUser, user.Role);
                        }
                        else Console.WriteLine($"--Error create user {user.Email}--");
                    }

                }
                catch (Exception ex)
                {
                    Console.WriteLine($"--Error parse json--{ex.Message}");
                }
            }
            else Console.WriteLine($"--Error open file {jsonFile}--");
        }


        if (!context.Categories.Any())
        {
            var imageService = scope.ServiceProvider.GetRequiredService<IImageService>();
            var jsonFile = Path.Combine(Directory.GetCurrentDirectory(), "Helpers", "JsonData", "Categories.json");
            if (File.Exists(jsonFile))
            {
                var jsonData = File.ReadAllText(jsonFile, Encoding.UTF8);
                try
                {
                    var categories = JsonConvert.DeserializeObject<List<SeederCategoryModel>>(jsonData)
                        ?? throw new JsonException();
                    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<UserEntity>>();
                    foreach (var category in categories)
                    {
                        var newCategory = new CategoryEntity
                        {
                            Name = category.Name,
                            Description = category.Description,
                            UserId=category.UserId,
                            Image = await imageService.SaveImageFromUrlAsync(category.Image)
                        };
                        context.Categories.Add(newCategory);
                        context.SaveChanges();
                    }

                }
                catch (Exception ex)
                {
                    Console.WriteLine($"--Error parse json--{ex.Message}");
                }
            }
            else Console.WriteLine($"--Error open file {jsonFile}--");
        }
    }
}
