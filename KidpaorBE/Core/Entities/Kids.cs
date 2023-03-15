namespace Core.Entities;

public class Kids : BaseEntity
{
    public string Fullname { get; set; }
    public string Age { get; set; }
    public int ParentId { get; set; }
    public Parents Parent { get; set; }
}