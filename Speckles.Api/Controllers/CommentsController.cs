using Microsoft.AspNetCore.Mvc;
using Speckles.Api.Lib;
using Speckles.Database;

namespace Speckles.Api.Controllers;

[ApiController]
[Route(ApiEndpoints.API_BASE)]
public class CommentsController : Controller
{
    private readonly ApplicationDbContext _database;
    
    public CommentsController(ApplicationDbContext database)
    {
        _database = database;
    }

    /// <summary>
    /// Creates comment.
    /// </summary>
    /// <remarks>
    /// This endpoint creates a comment.
    /// </remarks>
    /// <returns>Creates comment.</returns>
    /// <response code="201">Creates comment.</response>
    [ProducesResponseType(201)]
    [HttpPost(ApiEndpoints.Comments.POST_COMMENT)]
    public IActionResult CreateComment()
    {
        return Ok();
    }
    
    /// <summary>
    /// Updates comment.
    /// </summary>
    /// <remarks>
    /// This endpoint updates a comment.
    /// </remarks>
    /// <returns>Updates comment.</returns>
    /// <response code="204">Updates comment.</response>
    /// <response code="404">Comment was not found.</response>
    [ProducesResponseType(204)]
    [ProducesResponseType(typeof(ApiError), 404)]
    [HttpPut(ApiEndpoints.Comments.PUT_COMMENT)]
    public IActionResult UpdateComment(string commentId)
    {
        var commentExists = _database.Comments.Any(x => x.CommentId == commentId);
        
        if(!commentExists)
            return NotFound(new ApiError("Comment", commentId));
        
        return NoContent();
    }
    
    /// <summary>
    /// Deletes comment.
    /// </summary>
    /// <remarks>
    /// This endpoint deletes a comment.
    /// </remarks>
    /// <returns>Deletes comment.</returns>
    /// <response code="204">Deletes comment.</response>
    /// <response code="404">Comment was not found.</response>
    [ProducesResponseType(204)]
    [ProducesResponseType(typeof(ApiError), 404)]
    [HttpDelete(ApiEndpoints.Comments.DELETE_COMMENT)]
    public IActionResult DeleteComment(string commentId)
    {
        var commentExists = _database.Comments.Any(x => x.CommentId == commentId);
        
        if(!commentExists)
            return NotFound(new ApiError("Comment", commentId));
        
        return NoContent();
    }
    
    /// <summary>
    /// Creates comment's like.
    /// </summary>
    /// <remarks>
    /// This endpoint creates a comment's like.
    /// </remarks>
    /// <returns>Creates comment's like.</returns>
    /// <response code="201">Creates comment's like.</response>
    /// <response code="404">Comment was not found.</response>
    [ProducesResponseType(201)]
    [ProducesResponseType(typeof(ApiError), 404)]
    [HttpPost(ApiEndpoints.Comments.POST_LIKE)]
    public IActionResult CreateCommentLink(string commentId)
    {
        var commentExists = _database.Comments.Any(x => x.CommentId == commentId);
        
        if(!commentExists)
            return NotFound(new ApiError("Comment", commentId));
        
        return Ok();
    }
}