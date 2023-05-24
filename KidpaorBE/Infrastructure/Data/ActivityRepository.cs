using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class ActivityRepository : IActivityRepository
{
    private readonly StoreContext _context;

    public ActivityRepository(StoreContext context)
    {
        _context = context;
    }

    public async Task<Activity> GetActivityByIdAsync(int id)
    {
        return await _context.Activities
            .Include(p => p.Category)
            .Include(p => p.Organizer)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<Activity> DeleteActivityAsync(int id)
    {
        var result = await _context.Activities
            .FirstOrDefaultAsync(p => p.Id == id);
        if (result != null)
        {
            _context.Activities.Remove(result);
            await _context.SaveChangesAsync();
            return result;
        }

        return null;
    }

    public async Task<IReadOnlyList<Activity>> GetActivitiesAsync()
    {
        return await _context.Activities
            .Include(p => p.Category)
            .Include(p => p.Organizer)
            .ToListAsync();
    }

    public async Task<Activity> AddActivityAsync(Activity activity)
    {
        var result = await _context.Activities.AddAsync(activity);
        await _context.SaveChangesAsync();
        return result.Entity;
    }
    
    public async Task<Activity> UpdateActivityAsync(Activity activity)
    {
        var result = await _context.Activities
            .FirstOrDefaultAsync(p => p.Id == activity.Id);

        if (result != null)
        {
            result.Title = activity.Title;
            result.Description = activity.Description;
            result.DateStart = activity.DateStart;
            result.DateEnd = activity.DateEnd;
            result.ActivitiesCategoryId = activity.ActivitiesCategoryId;
            result.ActivitiesOrganizerId = activity.ActivitiesOrganizerId;
            result.Cost = activity.Cost;
            result.AgeRange = activity.AgeRange;
            result.Location = activity.Location;
            result.Organizer = activity.Organizer;
            result.Category = activity.Category;

            await _context.SaveChangesAsync();

            return result;
        }

        return null;
    }

    public async Task<IReadOnlyList<ActivitiesCategories>> GetActivitiesCategoriesAsync()
    {
        return await _context.ActivitiesCategories.ToListAsync();
    }

    public async Task<IReadOnlyList<Organizers>> GetOrganizersAsync()
    {
        return await _context.Organizers.ToListAsync();
    }
}