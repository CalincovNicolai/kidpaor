namespace Core.Entities;

public class ActivitiesKids : BaseEntity
{
    public Kid Kid { get; set; }
    public Activity Activity { get; set; }
}