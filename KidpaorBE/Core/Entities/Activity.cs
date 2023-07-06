namespace Core.Entities;

public class Activity : BaseEntity
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string AgeRange { get; set; }
    public string Location { get; set; }
    public string Cost { get; set; }
    public string ImageName { get; set; }
    public DateTime DateStart { get; set; }
    public DateTime DateEnd { get; set; }
    public ActivitiesCategories Category { get; set; }
    public int ActivitiesCategoryId { get; set; }
    public Organizers Organizer { get; set; }
    public int ActivitiesOrganizerId { get; set; }
}