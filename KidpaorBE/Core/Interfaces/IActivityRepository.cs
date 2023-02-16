using Core.Entities;

namespace Core.Interfaces;

public interface IActivityRepository
{
    Task<Activities> GetActivityByIdAsync(int id);
    Task<IReadOnlyList<Activities>> GetActivitiesAsync();
    Task<IReadOnlyList<ActivitiesCategories>> GetActivitiesCategoriesAsync();
    Task<IReadOnlyList<Organizers>> GetOrganizersAsync();
}