using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class KidRepository : IKidRepository
{
    private readonly StoreContext _context;

    public KidRepository(StoreContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Kid>> GetAllAsync()
    {
        return await _context.Kids.ToListAsync();
    }

    public async Task<Kid> GetByIdAsync(int id)
    {
        return await _context.Kids.FindAsync(id);
    }

    public void Add(Kid entity)
    {
        _context.Kids.Add(entity);
    }

    public void Update(Kid entity)
    {
        _context.Kids.Update(entity);
    }

    public void Remove(Kid entity)
    {
        _context.Kids.Remove(entity);
    }
    
    public async Task<IEnumerable<Kid>> GetKidsByActivityIdAsync(int activityId)
    {
        var kidsByActivity = await _context.ActivitiesKids
            .Where(a => a.Activity.Id == activityId)
            .Select(a => a.Kid)
            .ToListAsync();

        return kidsByActivity;
    }
    
    public async Task DeleteKidFromActivityAsync(int activityId, int kidId)
    {
        var activityKid = await _context.ActivitiesKids
            .FirstOrDefaultAsync(ak => ak.Kid.Id == kidId && ak.Activity.Id == activityId);

        if (activityKid != null)
        {
            _context.ActivitiesKids.Remove(activityKid);
            await _context.SaveChangesAsync();
        }
    }
}