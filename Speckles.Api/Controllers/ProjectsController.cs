using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Speckles.Api.BodyModels;
using Speckles.Api.Dto;
using Speckles.Api.Lib;

namespace Speckles.Api.Controllers;

[ApiController]
[Route(ApiEndpoints.API_BASE)]
public class ProjectsController : Controller
{
    private readonly DatabaseService _database;
    
    public ProjectsController(DatabaseService database)
    {
        _database = database;
    }

    /// <summary>
    /// Creates project.
    /// </summary>
    /// <remarks>
    /// This endpoint creates a project.
    /// </remarks>
    /// <returns>Creates project.</returns>
    /// <response code="201">Creates project.</response>
    [ProducesResponseType(201)]
    [HttpPost(ApiEndpoints.Projects.POST_PROJECT)]
    public IActionResult CreateProject([FromBody, Required] PostProjectBody body)
    {
        var studioExists = _database.StudioExists(body.slug);
        
        if(!studioExists)
            return NotFound(new ApiError("Studio", body.slug));
        
        _database.CreateProject(body);
        
        return NoContent();
    }
    
    /// <summary>
    /// Updates project.
    /// </summary>
    /// <remarks>
    /// This endpoint updates a project.
    /// </remarks>
    /// <returns>Updates project.</returns>
    /// <response code="204">Updates project.</response>
    /// <response code="404">Project was not found.</response>
    [ProducesResponseType(204)]
    [ProducesResponseType(typeof(ApiError), 404)]
    [HttpPut(ApiEndpoints.Projects.PUT_PROJECT)]
    public IActionResult UpdateProject(string projectId)
    {
        var projectExists = _database.ProjectExists(projectId);
        
        if (!projectExists)
            return NotFound(new ApiError("Project", projectId));
        
        _database.UpdateProject();
        
        return NoContent();
    }
    
    /// <summary>
    /// Deletes project.
    /// </summary>
    /// <remarks>
    /// This endpoint deletes a project.
    /// </remarks>
    /// <returns>Deletes project.</returns>
    /// <response code="204">Deletes project.</response>
    /// <response code="404">Project was not found.</response>
    [ProducesResponseType(204)]
    [ProducesResponseType(typeof(ApiError), 404)]
    [HttpDelete(ApiEndpoints.Projects.DELETE_PROJECT)]
    public IActionResult DeleteProject(string projectId)
    {
        var projectExists = _database.ProjectExists(projectId);
        
        if(!projectExists)
            return NotFound(new ApiError("Project", projectId));

        _database.DeleteProject(projectId);
        
        return NoContent();
    }
}