using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class ParentRepository : IParentRepository
{
    private readonly StoreContext _context;

    public ParentRepository(StoreContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<Parents>> GetParentsAsync()
    {
        return await _context.Parents.ToListAsync();
    }

    public async Task<IReadOnlyList<Kids>> GetKidsAsync()
    {
        return await _context.Kids.ToListAsync();
    }

    public async Task<Parents> GetParentByIdAsync(int id)
    {
        return await _context.Parents
            .FirstOrDefaultAsync(p => p.Id == id);
    }
}