namespace Core.Entities;

public class Parents : BaseEntity
{
    public string Fullname { get; set; }
    public string Email { get; set; }
    public string Address { get; set; }
    public string Phone { get; set; }
    
    public ICollection<Kids> Kids { get; set; }
}