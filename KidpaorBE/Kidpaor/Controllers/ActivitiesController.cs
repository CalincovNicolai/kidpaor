using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Kidpaor.Controllers;

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
        /*if (!User.IsInRole("Parent"))
        {
            throw new UnauthorizedAccessException("Only parents can access this information.");
        }*/

        /*var allActivities = await _activityRepository.GetActivitiesAsync();*/
        
        var allActivities = new List<Activity>();

        for (int i = 1; i <= 10; i++)
        {
            var mockActivity = new Activity
            {
                Id = i,
                Title = $"Family Picnic {i}",
                DateStart = DateTime.Now.AddDays(i),
                Location = $"Central Park {i}",
                Category = new ActivitiesCategories { Id = i, Name = $"Outdoor Activities {i}" },
                Cost = "10.0",
                Description = "Enjoy a fun-filled day at Central Park with your family and friends. Pack a picnic basket and join us for various games and activities.",
                Organizer = new Organizers { Id = i, Fullname = $"City Events & Recreation {i}" },
                AgeRange = $"{i+6}+ years",
                DateEnd = DateTime.Now.AddDays(i+7).AddHours(i+3),
                ActivitiesCategoryId = i,
                ActivitiesOrganizerId = i
            };

            allActivities.Add(mockActivity);
        }

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
        /*var activity = await _activityRepository.GetActivityByIdAsync(id);
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
        };*/
        
        var mockActivity = new Activity
        {
            Id = id,
            Title = "Family Picnic",
            DateStart = DateTime.Now.AddDays(7),
            Location = "Central Park",
            Category = new ActivitiesCategories { Id = 1, Name = "Outdoor Activities" },
            Cost = "10.0",
            Description = "Enjoy a fun-filled day at Central Park with your family and friends. Pack a picnic basket and join us for various games and activities.",
            Organizer = new Organizers { Id = 1, Fullname = "City Events & Recreation" },
            AgeRange = "All ages",
            DateEnd = DateTime.Now.AddDays(7).AddHours(4),
            ActivitiesCategoryId = 1,
            ActivitiesOrganizerId = 1
        };

        // Convert the mock activity to the view model
        var activityViewModel = new ActivityViewModel()
        {
            Id = mockActivity.Id,
            Title = mockActivity.Title,
            DateStart = mockActivity.DateStart,
            Location = mockActivity.Location,
            Category = mockActivity.Category,
            Cost = mockActivity.Cost,
            Description = mockActivity.Description,
            Organizer = mockActivity.Organizer,
            AgeRange = mockActivity.AgeRange,
            DateEnd = mockActivity.DateEnd,
            ActivitiesCategoryId = mockActivity.ActivitiesCategoryId,
            ActivitiesOrganizerId = mockActivity.ActivitiesOrganizerId
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