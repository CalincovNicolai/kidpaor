using System.Linq.Expressions;

namespace Core.Specifications;

public interface ISpecification<T>
{
    // This is the expression that will be used to filter the data
    Expression<Func<T, bool>> Criteria { get; }

    // This is the expression that will be used to include the related data
    List<Expression<Func<T, object>>> Includes { get; }
    Expression<Func<T, object>> OrderBy { get; }
    Expression<Func<T, object>> OrderByDescending { get; }
    int Take { get; }
    int Skip { get; }
    bool IsPagingEnabled { get; }
}