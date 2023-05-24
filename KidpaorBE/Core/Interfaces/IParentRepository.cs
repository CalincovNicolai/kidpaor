using Core.Entities;

namespace Core.Interfaces;

public interface IParentRepository
{
    Task<Parents> GetParentByIdAsync(int id);
    Task<IReadOnlyList<Parents>> GetParentsAsync();
    Task<IReadOnlyList<Kid>> GetKidsAsync();
}