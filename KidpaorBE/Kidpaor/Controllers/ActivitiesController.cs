using System.Security.Claims;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Activity = Core.Entities.Activity;

namespace Kidpaor.Controllers;

[Authorize]
public class ActivitiesController : BaseApiController
{
    private readonly IActivityRepository _activityRepository;
    private readonly ITokenService _tokenService;
    private readonly UserManager<AppUser> _userManager;


    public ActivitiesController(IActivityRepository activityRepository, ITokenService tokenService,
        UserManager<AppUser> userManager)
    {
        _activityRepository = activityRepository;
        _tokenService = tokenService;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<ActionResult<List<ActivityItemViewModel>>> GetActivities()
    {
        if (!User.IsInRole("Parent"))
        {
            throw new UnauthorizedAccessException("Only parents can access this information.");
        }

        var allActivities = await _activityRepository.GetActivitiesAsync();

        var activitiesItemViewModels = allActivities.Select(a => new ActivityItemViewModel()
        {
            Id = a.Id,
            Location = a.Location,
            Title = a.Title,
            DateStart = a.DateStart
        });

        return Ok(activitiesItemViewModels);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<ActivityViewModel>> GetActivity(int id)
    {
        var activity = await _activityRepository.GetActivityByIdAsync(id);
        var activityViewModel = new ActivityViewModel()
        {
            Id = activity.Id,
            Title = activity.Title,
            DateStart = activity.DateStart,
            Location = activity.Location,
            Category = activity.Category,
            Cost = activity.Cost,
            Description = activity.Description,
            Organizer = activity.Organizer,
            AgeRange = activity.AgeRange,
            DateEnd = activity.DateEnd,
            ActivitiesCategoryId = activity.ActivitiesCategoryId,
            ActivitiesOrganizerId = activity.ActivitiesOrganizerId
        };

        return Ok(activityViewModel);
    }

    [HttpPost]
    public async Task<ActionResult<Activity>> CreateActivity(Activity activity)
    {
        try
        {
            if (activity == null)
            {
                return BadRequest();
            }

            var createdActivity = await _activityRepository.AddActivityAsync(activity);

            return CreatedAtAction(nameof(GetActivity), new { id = createdActivity.Id },
                createdActivity);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error creating new activity record");
        }
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<Activity>> UpdateActivity(int id, Activity activity)
    {
        try
        {
            if (id != activity.Id)
            {
                return BadRequest("Activity ID mismatch");
            }

            var activityToUpdate = await _activityRepository.GetActivityByIdAsync(id);


            if (activityToUpdate == null)
            {
                return NotFound($"Activity with Id = {id} not found");
            }

            return await _activityRepository.UpdateActivityAsync(activity);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error updating data");
        }
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<Activity>> DeleteActivity(int id)
    {
        try
        {
            var activityToDelete = await _activityRepository.GetActivityByIdAsync(id);

            if (activityToDelete == null)
            {
                return NotFound($"Employee with Id = {id} not found");
            }

            return await _activityRepository.DeleteActivityAsync(id);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error deleting data");
        }
    }

    [HttpGet("categories")]
    public async Task<ActionResult<IReadOnlyList<ActivitiesCategories>>> GetActivitiesCategories()
    {
        var activitiesCategories = await _activityRepository.GetActivitiesCategoriesAsync();

        return Ok(activitiesCategories);
    }

    [HttpGet("organizers")]
    public async Task<ActionResult<IReadOnlyList<Organizers>>> GetActivitiesOrganizers()
    {
        var activitiesOrganizers = await _activityRepository.GetOrganizersAsync();

        return Ok(activitiesOrganizers);
    }
}