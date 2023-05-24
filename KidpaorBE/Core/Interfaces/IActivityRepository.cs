using Core.Entities;

namespace Core.Interfaces;

public interface IActivityRepository
{
    Task<Activity> GetActivityByIdAsync(int id);
    Task<Activity> AddActivityAsync(Activity activity);
    Task<Activity> UpdateActivityAsync(Activity activity);
    Task<Activity> DeleteActivityAsync(int id);
    Task<IReadOnlyList<Activity>> GetActivitiesAsync();
    Task<IReadOnlyList<ActivitiesCategories>> GetActivitiesCategoriesAsync();
    Task<IReadOnlyList<Organizers>> GetOrganizersAsync();
}