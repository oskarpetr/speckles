using Mapster;
using Speckles.Api.Dto;
using Speckles.Database.Tables;

namespace Speckles.Api.Mappings;

public class MapsterConfiguration
{
    public static void Configure()
    {
        // User -> UserDto
        TypeAdapterConfig<User, UserDto>.NewConfig()
            .Map(dest => dest.AddressShort, src => src.Address.Adapt<AddressShortDto>())
            .Map(dest => dest.Studios, src => src.Studios.Adapt<List<StudioShortDto>>())
            .Map(dest => dest.Following, src => src.Following.Adapt<List<StudioShortDto>>());

        // StudioMember -> ShortStudioDto
        TypeAdapterConfig<StudioMember, StudioShortDto>.NewConfig()
            .Map(dest => dest, src => src.Studio);
        
        // Following -> ShortStudioDto
        TypeAdapterConfig<UserFollow, StudioShortDto>.NewConfig()
            .Map(dest => dest, src => src.Studio);
        
        // StudioMember -> ShortMemberDto
        TypeAdapterConfig<StudioMember, UserShortDto>.NewConfig()
            .Map(dest => dest.UserId, src => src.User.UserId)
            .Map(dest => dest.Username, src => src.User.Username)
            .Map(dest => dest.FullName, src => src.User.FullName)
            .Map(dest => dest.Email, src => src.User.Email);
        
        // Comment -> CommentDto
        TypeAdapterConfig<Comment, CommentDto>.NewConfig()
            .Map(dest => dest.Likes, src => src.LikedBy.Count);
            
        // AssetTag -> TagDto
        TypeAdapterConfig<AssetTag, TagDto>.NewConfig()
            .Map(dest => dest.TagId, src => src.Tag.TagId)
            .Map(dest => dest.Name, src => src.Tag.Name)
            .Map(dest => dest.Assets, src => src.Tag.Assets.Adapt<List<AssetShortDto>>());
        
        // AssetTag -> ShortTagDto
        TypeAdapterConfig<AssetTag, TagShortDto>.NewConfig()
            .Map(dest => dest.TagId, src => src.Tag.TagId)
            .Map(dest => dest.Name, src => src.Tag.Name);
        
        // AssetTag -> ShortAssetDto
        TypeAdapterConfig<AssetTag, AssetShortDto>.NewConfig()
            .Map(dest => dest, src => src.Asset);
    }
}