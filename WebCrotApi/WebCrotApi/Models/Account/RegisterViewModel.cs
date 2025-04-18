namespace WebCrotApi.Models.Account;

public class RegisterViewModel
{
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public IFormFile Iamge { get; set; } = null!;
    public string Email { get; set; } = null!; 
    public string Password { get; set; } = null!;
}
