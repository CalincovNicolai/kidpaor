using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Kidpaor.Controllers;

public class ParentsController : BaseApiController
{
    private readonly IParentRepository _parentRepository;

    public ParentsController(IParentRepository parentRepository)
    {
        _parentRepository = parentRepository;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<List<Parents>>> GetParents()
    {
        var parents = await _parentRepository.GetParentsAsync();

        return Ok(parents);
    }
    
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<Parents>> GetParent(int id)
    {
        return await _parentRepository.GetParentByIdAsync(id);
    }
    
    [HttpGet("kids")]
    public async Task<ActionResult<IReadOnlyList<Kid>>> GetKids()
    {
        var kids = await _parentRepository.GetKidsAsync();

        return Ok(kids);
    }
}