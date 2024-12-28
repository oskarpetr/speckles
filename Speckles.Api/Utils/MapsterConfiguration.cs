using Mapster;
using Speckles.Api.Dto;
using Speckles.Database.Tables;

namespace Speckles.Api.Mappings;

public class MapsterConfiguration
{
    public static void Configure()
    {
        // User -> UserDto
        TypeAdapterConfig<Member, UserDto>.NewConfig()
            .Map(dest => dest.ShortAddress, src => src.Address.Adapt<ShortAddressDto>())
            .Map(dest => dest.Studios, src => src.Studios.Adapt<List<ShortStudioDto>>())
            .Map(dest => dest.Following, src => src.Following.Adapt<List<ShortStudioDto>>());

        // StudioMember -> ShortStudioDto
        TypeAdapterConfig<StudioMember, ShortStudioDto>.NewConfig()
            .Map(dest => dest, src => src.Studio);
        
        // Following -> ShortStudioDto
        TypeAdapterConfig<UserFollow, ShortStudioDto>.NewConfig()
            .Map(dest => dest, src => src.Studio);
        
        // StudioMember -> ShortMemberDto
        TypeAdapterConfig<StudioMember, ShortMemberDto>.NewConfig()
            .Map(dest => dest.MemberId, src => src.Member.MemberId)
            .Map(dest => dest.Username, src => src.Member.Username)
            .Map(dest => dest.FullName, src => src.Member.FullName)
            .Map(dest => dest.Email, src => src.Member.Email);
        
        // Comment -> CommentDto
        TypeAdapterConfig<Comment, CommentDto>.NewConfig()
            .Map(dest => dest.Likes, src => src.LikedBy.Count);
            
        // AssetTag -> TagDto
        TypeAdapterConfig<AssetTag, TagDto>.NewConfig()
            .Map(dest => dest.TagId, src => src.Tag.TagId)
            .Map(dest => dest.Name, src => src.Tag.Name)
            .Map(dest => dest.Assets, src => src.Tag.Assets.Adapt<List<ShortAssetDto>>());
        
        // AssetTag -> ShortTagDto
        TypeAdapterConfig<AssetTag, ShortTagDto>.NewConfig()
            .Map(dest => dest.TagId, src => src.Tag.TagId)
            .Map(dest => dest.Name, src => src.Tag.Name);
        
        // AssetTag -> ShortAssetDto
        TypeAdapterConfig<AssetTag, ShortAssetDto>.NewConfig()
            .Map(dest => dest, src => src.Asset);
    }
}