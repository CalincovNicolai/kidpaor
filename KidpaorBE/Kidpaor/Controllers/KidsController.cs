using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Kidpaor.Controllers;

public class KidsController : BaseApiController
{
    private readonly IKidRepository _kidRepository;
    private readonly IActivityRepository _activityRepository;

    public KidsController(IKidRepository kidRepository, IActivityRepository activityRepository)
    {
        _kidRepository = kidRepository;
        _activityRepository = activityRepository;
    }

    [HttpGet("ByActivity/{activityId}")]
    public async Task<ActionResult<IEnumerable<KidBriefViewModel>>> GetKidsByActivity(int activityId)
    {
        var activity = await _activityRepository.GetActivityByIdAsync(activityId);
        if (activity == null)
            return NotFound();

        var kidsByActivity = await _kidRepository.GetKidsByActivityIdAsync(activityId);
        var kids = kidsByActivity.Select(a => new KidBriefViewModel()
        {
            Id = a.Id,
            Fullname = a.Fullname,
            Age = a.Age
        });

        return Ok(kids);
    }
    
    [HttpDelete("DeleteFromActivity/{activityId}/{kidId}")]
    public async Task<ActionResult> DeleteKidFromActivity(int activityId, int kidId)
    {
        var activity = await _activityRepository.GetActivityByIdAsync(activityId);
        if (activity == null)
            return NotFound($"Activity with ID {activityId} not found.");

        var kid = await _kidRepository.GetByIdAsync(kidId);
        if (kid == null)
            return NotFound($"Kid with ID {kidId} not found.");
        
        await _kidRepository.DeleteKidFromActivityAsync(activityId, kidId);

        return Ok($"Kid was successfully removed from {activity.Title}.");
    }
}