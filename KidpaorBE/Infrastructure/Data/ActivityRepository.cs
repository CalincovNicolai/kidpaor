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

    public async Task<Activities> GetActivityByIdAsync(int id)
    {
        return await _context.Activities
            .Include(p => p.Category)
            .Include(p => p.Organizer)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<IReadOnlyList<Activities>> GetActivitiesAsync()
    {
        return await _context.Activities
            .Include(p => p.Category)
            .Include(p => p.Organizer)
            .ToListAsync();
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