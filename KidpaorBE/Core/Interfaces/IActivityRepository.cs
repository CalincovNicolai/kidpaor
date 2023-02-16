using Core.Entities;

namespace Core.Interfaces;

public interface IActivityRepository
{
    Task<Activities> GetActivityByIdAsync(int id);
    Task<Activities> AddActivityAsync(Activities activity);
    Task<Activities> UpdateActivityAsync(Activities activity);
    Task<Activities> DeleteActivityAsync(int id);
    Task<IReadOnlyList<Activities>> GetActivitiesAsync();
    Task<IReadOnlyList<ActivitiesCategories>> GetActivitiesCategoriesAsync();
    Task<IReadOnlyList<Organizers>> GetOrganizersAsync();
}