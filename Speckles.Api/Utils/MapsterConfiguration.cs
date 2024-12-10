using Mapster;
using Speckles.Api.Dto;
using Speckles.Database.Tables;

namespace Speckles.Api.Mappings;

public class MapsterConfiguration
{
    public static void Configure()
    {
        // Studio -> StudioDto
        // TypeAdapterConfig<Studio, StudioDto>.NewConfig()
        //     .Map(dest => dest.StudioId, src => src.StudioId)
        //     .Map(dest => dest.Members, src => src.Members.Adapt<List<ShortMemberDto>>())
        //     .Map(dest => dest.Assets, src => src.Assets)
        //     .Map(dest => dest.Address, src => src.Address)
        //     .Map(dest => dest.Name, src => src.Name)
        //     .Map(dest => dest.Portfolio, src => src.Portfolio)
        //     .Map(dest => dest.Slug, src => src.Slug)
        //     .Map(dest => dest.ContactEmail, src => src.ContactEmail);
        
        // Studio -> ShortStudioDto
        // TypeAdapterConfig<Studio, ShortStudioDto>.NewConfig()
        //     .Map(dest => dest.StudioId, src => src.StudioId)
        //     .Map(dest => dest.Name, src => src.Name)
        //     .Map(dest => dest.Slug, src => src.Slug);
        
        // StudioMember -> MemberDto
        
        // StudioMember -> ShortMemberDto
        TypeAdapterConfig<StudioMember, ShortMemberDto>.NewConfig()
            .Map(dest => dest.MemberId, src => src.Member.MemberId)
            .Map(dest => dest.Username, src => src.Member.Username)
            .Map(dest => dest.FullName, src => src.Member.FullName)
            .Map(dest => dest.Email, src => src.Member.Email);
        
        // Image -> ImageDto
        // TypeAdapterConfig<Image, ImageDto>.NewConfig()
        //     .Map(dest => dest.ImageId, src => src.ImageId)
        //     .Map(dest => dest.Alt, src => src.Alt);
        
        // File -> FileDto
        // TypeAdapterConfig<File, FileDto>.NewConfig()
        //     .Map(dest => dest.FileId, src => src.FileId)
        //     .Map(dest => dest.Name, src => src.Name)
        //     .Map(dest => dest.FileName, src => src.FileName)
        //     .Map(dest => dest.Size, src => src.Size);
        
        // Comment -> CommentDto
        TypeAdapterConfig<Comment, CommentDto>.NewConfig()
            // .Map(dest => dest.CommentId, src => src.CommentId)
            // .Map(dest => dest.Text, src => src.Text)
            // .Map(dest => dest.Date, src => src.Date)
            .Map(dest => dest.Likes, src => src.LikedBy.Count);
            // .Map(dest => dest.Member, src => src.Member.Adapt<ShortMemberDto>());
        
        // Asset -> AssetDto
        // TypeAdapterConfig<Asset, AssetDto>.NewConfig()
        //     .Map(dest => dest.AssetId, src => src.AssetId)
        //     .Map(dest => dest.Name, src => src.Name)
        //     .Map(dest => dest.Price, src => src.Price)
        //     .Map(dest => dest.Currency, src => src.Currency)
        //     .Map(dest => dest.Description, src => src.Description)
        //     .Map(dest => dest.Thumbnail, src => src.Thumbnail.Adapt<ImageDto>())
        //     .Map(dest => dest.Images, src => src.Images.Adapt<List<ImageDto>>())
        //     .Map(dest => dest.Comments, src => src.Comments.Adapt<List<CommentDto>>())
        //     .Map(dest => dest.License, src => src.License)
        //     .Map(dest => dest.CustomLicense, src => src.CustomLicense)
        //     .Map(dest => dest.Files, src => src.Files.Adapt<List<FileDto>>())
        //     .Map(dest => dest.Tags, src => src.Tags.Adapt<List<ShortTagDto>>())
        //     .Map(dest => dest.Studio, src => src.Studio.Adapt<ShortStudioDto>());
        
        // Asset -> ShortAssetDto
        // TypeAdapterConfig<Asset, ShortAssetDto>.NewConfig()
        //     .Map(dest => dest.AssetId, src => src.AssetId)
        //     .Map(dest => dest.Name, src => src.Name)
        //     .Map(dest => dest.Price, src => src.Price)
        //     .Map(dest => dest.Currency, src => src.Currency)
        //     .Map(dest => dest.Tags, src => src.Tags.Adapt<List<ShortTagDto>>())
        //     .Map(dest => dest.Thumbnail, src => src.Thumbnail.Adapt<ImageDto>());
        
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

        // Order -> OrderDto
        // TypeAdapterConfig<Order, OrderDto>.NewConfig()
        //     .Map(dest => dest.OrderId, src => src.OrderId)
        //     .Map(dest => dest.Date, src => src.Date)
        //     .Map(dest => dest.PaymentMethod, src => src.PaymentMethod)
        //     .Map(dest => dest.Asset, src => src.Asset.Adapt<AssetDto>());

        // Order -> ShortOrderDto
        // TypeAdapterConfig<Order, ShortOrderDto>.NewConfig()
        //     .Map(dest => dest.OrderId, src => src.OrderId)
        //     .Map(dest => dest.Date, src => src.Date)
        //     .Map(dest => dest.Asset, src => src.Asset.Adapt<ShortAssetDto>());
    }
}