using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Speckles.Api.BodyModels;
using Speckles.Api.Lib;

namespace Speckles.Api.Controllers;

[ApiController]
[Route(ApiEndpoints.API_BASE)]
public class CommentsController : Controller
{
    private readonly DatabaseService _database;
    
    public CommentsController(DatabaseService database)
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
    public IActionResult CreateComment([FromBody, Required] PostCommentBody body)
    {
        var assetExists = _database.AssetExists(body.assetId);
        
        if(!assetExists)
            return NotFound(new ApiError("Asset", body.assetId));

        var userExists = _database.UserExists(body.userId);
        
        if(!userExists)
            return NotFound(new ApiError("User", body.userId));

        _database.CreateComment(body);
        
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
    public IActionResult UpdateComment(string commentId, [FromBody, Required] PutCommentBody body)
    {
        var commentExists = _database.CommentExists(commentId);
        
        if(!commentExists)
            return NotFound(new ApiError("Comment", commentId));

        _database.UpdateComment(commentId, body);
        
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
        var commentExists = _database.CommentExists(commentId);
        
        if(!commentExists)
            return NotFound(new ApiError("Comment", commentId));

        _database.DeleteComment(commentId);
        
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
    public IActionResult CreateCommentLike([FromRoute] string commentId, [FromQuery] string userId)
    {
        var commentExists = _database.CommentExists(commentId);
        
        if(!commentExists)
            return NotFound(new ApiError("Comment", commentId));

        var userExists = _database.UserExists(userId);
        
        if(!userExists)
            return NotFound(new ApiError("User", userId));
        
        _database.CreateCommentLike(commentId, userId);
        
        return Ok();
    }
}