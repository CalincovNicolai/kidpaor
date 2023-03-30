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
    
    [HttpPost]
    public async Task<ActionResult<Activities>> CreateActivity(Activities activities)
    {
        try
        {
            if (activities == null)
            {
                return BadRequest();
            }

            var createdActivity = await _activityRepository.AddActivityAsync(activities);

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
    public async Task<ActionResult<Activities>> UpdateActivity(int id, Activities activity)
    {
        try
        {
            if(id != activity.Id)
            {
                return BadRequest("Activity ID mismatch");
            }
            
            var activityToUpdate = await _activityRepository.GetActivityByIdAsync(id);

            
            if(activityToUpdate == null)
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
    public async Task<ActionResult<Activities>> DeleteActivity(int id)
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