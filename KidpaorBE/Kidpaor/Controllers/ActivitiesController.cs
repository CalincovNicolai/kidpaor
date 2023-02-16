using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Kidpaor.Controllers;

public class ActivitiesController : BaseApiController
{
    private readonly IActivityRepository _activityRepository;

    public ActivitiesController(IActivityRepository activityRepository)
    {
        _activityRepository = activityRepository;
    }

    [HttpGet]
    public async Task<ActionResult<List<Activities>>> GetActivities()
    {
        var activities = await _activityRepository.GetActivitiesAsync();

        return Ok(activities);
    }
    
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<Activities>> GetActivity(int id)
    {
        return await _activityRepository.GetActivityByIdAsync(id);
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