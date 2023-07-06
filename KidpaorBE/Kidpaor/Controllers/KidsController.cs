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
        
        /*var mockActivity = new Activity
        {
            Id = activityId,
            Title = $"Family Picnic {activityId}",
            DateStart = DateTime.Now.AddDays(activityId),
            Location = $"Central Park {activityId}",
            Category = new ActivitiesCategories { Id = activityId, Name = $"Outdoor Activities {activityId}" },
            Cost = "10.0",
            Description = "Enjoy a fun-filled day at Central Park with your family and friends. Pack a picnic basket and join us for various games and activities.",
            Organizer = new Organizers { Id = activityId, Fullname = $"City Events & Recreation {activityId}" },
            AgeRange = "All ages",
            DateEnd = DateTime.Now.AddDays(activityId+7).AddHours(activityId+3),
            ActivitiesCategoryId = activityId,
            ActivitiesOrganizerId = activityId
        };*/

        var kidsByActivity = await _kidRepository.GetKidsByActivityIdAsync(activityId);
        var kids = kidsByActivity.Select(a => new KidBriefViewModel()
        {
            Id = a.Id,
            Fullname = a.Fullname,
            Age = a.Age
        });

        /*var mockKids = new List<Kid>
        {
            new Kid
            {
                Id = 1,
                Fullname = "John Doe",
                Age = "8"
            },
            new Kid
            {
                Id = 2,
                Fullname = "Emma Smith",
                Age = "10"
            },
            new Kid
            {
                Id = 3,
                Fullname = "Michael Johnson",
                Age = "9"
            },
            new Kid
            {
                Id = 4,
                Fullname = "Sophia Anderson",
                Age = "7"
            },
            new Kid
            {
                Id = 5,
                Fullname = "Jacob Lee",
                Age = "11"
            }
        };*/
        
        /*var kids = mockKids.Select(k => new KidBriefViewModel()
        {
            Id = k.Id,
            Fullname = k.Fullname,
            Age = k.Age
        }).ToList();*/

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
        
        /*var mockActivity = new Activity
        {
            Id = activityId,
            Title = "Sample Activity"
        };

        if (mockActivity == null)
            return NotFound($"Activity with ID {activityId} not found.");

        var mockKid = new Kid
        {
            Id = kidId,
            Fullname = "John Doe"
        };

        if (mockKid == null)
            return NotFound($"Kid with ID {kidId} not found.");

        await Task.Delay(100);

        return Ok($"Kid was successfully removed from {mockActivity.Title}.");*/
    }
}