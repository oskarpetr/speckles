using Mapster;
using Speckles.Api.Dto;
using Speckles.Database.Tables;

namespace Speckles.Api.Mappings;

public class AssetMapping
{
    // public static AssetDto MapAsset(Asset asset)
    // {
    //     TypeAdapterConfig<Image, ImageDto>.NewConfig()
    //         .Map(dest => dest.ImageId, src => src.ImageId)
    //         .Map(dest => dest.Alt, src => src.Alt);
    //
    //     TypeAdapterConfig<Asset, AssetDto>.NewConfig()
    //         .Map(dest => dest.Images, src => src.Images.Adapt<List<ImageDto>>())
    //         .Map(dest => dest.Comments, src => src.Comments)
    //         .Map(dest => dest.License, src => src.License)
    //         .Map(dest => dest.Studio, src => src.Studio);
    //
    //     return asset.Adapt<AssetDto>();
    // }
}