namespace Core.Entities;

public class Kids : BaseEntity
{
    public string Fullname { get; set; }
    public string Age { get; set; }
    public Parents Parents { get; set; }
    public int KidsParentId { get; set; }
}