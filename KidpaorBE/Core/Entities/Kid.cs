namespace Core.Entities;

public class Kid : BaseEntity
{
    public string Fullname { get; set; }
    public string Age { get; set; }
    public int ParentId { get; set; }
    public Parents Parent { get; set; }
}