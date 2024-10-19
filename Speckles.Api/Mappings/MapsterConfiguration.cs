using Mapster;
using Speckles.Api.Dto;
using Speckles.Database.Tables;

namespace Speckles.Api.Mappings;

public class MapsterConfiguration
{
    public static void Configure()
    {
        // Image -> ImageDto
        TypeAdapterConfig<Image, ImageDto>.NewConfig()
            .Map(dest => dest.ImageId, src => src.ImageId)
            .Map(dest => dest.Alt, src => src.Alt);

        // AssetTag -> Tag
        TypeAdapterConfig<AssetTag, Tag>.NewConfig()
            .Map(dest => dest.TagId, src => src.Tag.TagId)
            .Map(dest => dest.Name, src => src.Tag.Name);
        
        // Asset -> AssetDto
        TypeAdapterConfig<Asset, AssetDto>.NewConfig()
            .Map(dest => dest.AssetId, src => src.AssetId)
            .Map(dest => dest.Name, src => src.Name)
            .Map(dest => dest.Price, src => src.Price)
            .Map(dest => dest.Currency, src => src.Currency)
            .Map(dest => dest.Description, src => src.Description)
            .Map(dest => dest.Images, src => src.Images.Adapt<List<ImageDto>>())
            .Map(dest => dest.Comments, src => src.Comments)
            .Map(dest => dest.License, src => src.License)
            .Map(dest => dest.CustomLicense, src => src.CustomLicense)
            .Map(dest => dest.Tags, src => src.Tags.Adapt<List<Tag>>())
            .Map(dest => dest.Studio, src => src.Studio.Adapt<StudioDto>());
        
        // Asset -> ShortAssetDto
        TypeAdapterConfig<Asset, ShortAssetDto>.NewConfig()
            .Map(dest => dest.AssetId, src => src.AssetId)
            .Map(dest => dest.Name, src => src.Name)
            .Map(dest => dest.Price, src => src.Price)
            .Map(dest => dest.Currency, src => src.Currency)
            .Map(dest => dest.Image, src => src.Images.FirstOrDefault().Adapt<ImageDto>());
        
        // Order -> OrderDto
        TypeAdapterConfig<Order, OrderDto>.NewConfig()
            .Map(dest => dest.OrderId, src => src.OrderId)
            .Map(dest => dest.Date, src => src.Date)
            .Map(dest => dest.PaymentMethod, src => src.PaymentMethod)
            .Map(dest => dest.Asset, src => src.Asset.Adapt<AssetDto>());
        
        // Order -> ShortOrderDto
        TypeAdapterConfig<Order, ShortOrderDto>.NewConfig()
            .Map(dest => dest.OrderId, src => src.OrderId)
            .Map(dest => dest.Date, src => src.Date)
            .Map(dest => dest.Asset, src => src.Asset.Adapt<ShortAssetDto>());
    }
}