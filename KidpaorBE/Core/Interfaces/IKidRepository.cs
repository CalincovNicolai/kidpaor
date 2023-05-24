using Core.Entities;

namespace Core.Interfaces;

public interface IKidRepository
{
    Task<IEnumerable<Kid>> GetAllAsync();
    Task<IEnumerable<Kid>> GetKidsByActivityIdAsync(int id);
    Task DeleteKidFromActivityAsync(int activityId, int kidId);
    Task<Kid> GetByIdAsync(int id);
    void Add(Kid entity);
    void Update(Kid entity);
    void Remove(Kid entity);
}