﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Speckles.Database;

#nullable disable

namespace Speckles.Database.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Speckles.Database.Tables.Address", b =>
                {
                    b.Property<string>("AddressId")
                        .HasColumnType("text");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Zip")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("AddressId");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Asset", b =>
                {
                    b.Property<string>("AssetId")
                        .HasColumnType("text");

                    b.Property<DateTimeOffset>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("CurrencyId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LicenseId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<decimal>("Price")
                        .HasColumnType("numeric");

                    b.Property<string>("StudioId")
                        .HasColumnType("text");

                    b.Property<string>("ThumbnailId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("AssetId");

                    b.HasIndex("CurrencyId");

                    b.HasIndex("LicenseId");

                    b.HasIndex("StudioId");

                    b.HasIndex("ThumbnailId");

                    b.ToTable("Assets");
                });

            modelBuilder.Entity("Speckles.Database.Tables.AssetTag", b =>
                {
                    b.Property<string>("AssetTagId")
                        .HasColumnType("text");

                    b.Property<string>("AssetId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("TagId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("AssetTagId");

                    b.HasIndex("AssetId");

                    b.HasIndex("TagId");

                    b.ToTable("AssetsTags");
                });

            modelBuilder.Entity("Speckles.Database.Tables.BasketAsset", b =>
                {
                    b.Property<string>("BasketAssetId")
                        .HasColumnType("text");

                    b.Property<string>("AssetId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("BasketAssetId");

                    b.HasIndex("AssetId");

                    b.HasIndex("UserId");

                    b.ToTable("BasketAssets");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Comment", b =>
                {
                    b.Property<string>("CommentId")
                        .HasColumnType("text");

                    b.Property<string>("AssetId")
                        .HasColumnType("text");

                    b.Property<string>("AuthorId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTimeOffset>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("CommentId");

                    b.HasIndex("AssetId");

                    b.HasIndex("AuthorId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Country", b =>
                {
                    b.Property<string>("CountryId")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("CountryId");

                    b.ToTable("Countries");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Currency", b =>
                {
                    b.Property<string>("CurrencyId")
                        .HasColumnType("text");

                    b.Property<string>("Locale")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("CurrencyId");

                    b.ToTable("Currencies");
                });

            modelBuilder.Entity("Speckles.Database.Tables.CustomLicense", b =>
                {
                    b.Property<string>("CustomLicenseId")
                        .HasColumnType("text");

                    b.Property<string>("AssetId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("CustomLicenseId");

                    b.HasIndex("AssetId")
                        .IsUnique();

                    b.ToTable("CustomLicenses");
                });

            modelBuilder.Entity("Speckles.Database.Tables.File", b =>
                {
                    b.Property<string>("FileId")
                        .HasColumnType("text");

                    b.Property<string>("AssetId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FileName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<long>("Size")
                        .HasColumnType("bigint");

                    b.HasKey("FileId");

                    b.HasIndex("AssetId");

                    b.ToTable("Files");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Image", b =>
                {
                    b.Property<string>("ImageId")
                        .HasColumnType("text");

                    b.Property<string>("Alt")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("AssetId")
                        .HasColumnType("text");

                    b.Property<string>("ProjectId")
                        .HasColumnType("text");

                    b.HasKey("ImageId");

                    b.HasIndex("AssetId");

                    b.HasIndex("ProjectId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("Speckles.Database.Tables.License", b =>
                {
                    b.Property<string>("LicenseId")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("LicenseId");

                    b.ToTable("Licenses");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Order", b =>
                {
                    b.Property<string>("OrderId")
                        .HasColumnType("text");

                    b.Property<string>("AssetId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTimeOffset>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("PaymentMethod")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("OrderId");

                    b.HasIndex("AssetId");

                    b.HasIndex("UserId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Portfolio", b =>
                {
                    b.Property<string>("PortfolioId")
                        .HasColumnType("text");

                    b.Property<string>("About")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("PortfolioId");

                    b.ToTable("Portfolios");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Project", b =>
                {
                    b.Property<string>("ProjectId")
                        .HasColumnType("text");

                    b.Property<string>("Client")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("Personal")
                        .HasColumnType("boolean");

                    b.Property<string>("PortfolioId")
                        .HasColumnType("text");

                    b.HasKey("ProjectId");

                    b.HasIndex("PortfolioId");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Promotion", b =>
                {
                    b.Property<string>("PromotionId")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTimeOffset>("EndDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTimeOffset>("StartDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("PromotionId");

                    b.ToTable("Promotions");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Recommendation", b =>
                {
                    b.Property<string>("RecommendationId")
                        .HasColumnType("text");

                    b.Property<float>("Rate")
                        .HasColumnType("real");

                    b.Property<string>("TagId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.HasKey("RecommendationId");

                    b.HasIndex("TagId");

                    b.HasIndex("UserId");

                    b.ToTable("Recommendations");
                });

            modelBuilder.Entity("Speckles.Database.Tables.SavedAsset", b =>
                {
                    b.Property<string>("SavedAssetId")
                        .HasColumnType("text");

                    b.Property<string>("AssetId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("SavedAssetId");

                    b.HasIndex("AssetId");

                    b.HasIndex("UserId");

                    b.ToTable("SavedAssets");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Studio", b =>
                {
                    b.Property<string>("StudioId")
                        .HasColumnType("text");

                    b.Property<string>("AddressId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ContactEmail")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTimeOffset>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PortfolioId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Slug")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("StudioId");

                    b.HasIndex("AddressId");

                    b.HasIndex("PortfolioId");

                    b.ToTable("Studios");
                });

            modelBuilder.Entity("Speckles.Database.Tables.StudioUser", b =>
                {
                    b.Property<string>("StudioUserId")
                        .HasColumnType("text");

                    b.Property<string>("StudioId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("StudioUserId");

                    b.HasIndex("StudioId");

                    b.HasIndex("UserId");

                    b.ToTable("StudioUsers");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Tag", b =>
                {
                    b.Property<string>("TagId")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("TagId");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("Speckles.Database.Tables.User", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("AddressId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("UserId");

                    b.HasIndex("AddressId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Speckles.Database.Tables.UserFollow", b =>
                {
                    b.Property<string>("UserFollowId")
                        .HasColumnType("text");

                    b.Property<string>("StudioId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("UserFollowId");

                    b.HasIndex("StudioId");

                    b.HasIndex("UserId");

                    b.ToTable("UserFollows");
                });

            modelBuilder.Entity("Speckles.Database.Tables.UserLike", b =>
                {
                    b.Property<string>("UserLikeId")
                        .HasColumnType("text");

                    b.Property<string>("CommentId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("UserLikeId");

                    b.HasIndex("CommentId");

                    b.HasIndex("UserId");

                    b.ToTable("UserLikes");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Asset", b =>
                {
                    b.HasOne("Speckles.Database.Tables.Currency", "Currency")
                        .WithMany()
                        .HasForeignKey("CurrencyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Speckles.Database.Tables.License", "License")
                        .WithMany()
                        .HasForeignKey("LicenseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Speckles.Database.Tables.Studio", "Studio")
                        .WithMany("Assets")
                        .HasForeignKey("StudioId");

                    b.HasOne("Speckles.Database.Tables.Image", "Thumbnail")
                        .WithMany()
                        .HasForeignKey("ThumbnailId")
                        .OnDelete(DeleteBehavior.SetNull)
                        .IsRequired();

                    b.Navigation("Currency");

                    b.Navigation("License");

                    b.Navigation("Studio");

                    b.Navigation("Thumbnail");
                });

            modelBuilder.Entity("Speckles.Database.Tables.AssetTag", b =>
                {
                    b.HasOne("Speckles.Database.Tables.Asset", "Asset")
                        .WithMany("Tags")
                        .HasForeignKey("AssetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Speckles.Database.Tables.Tag", "Tag")
                        .WithMany("Assets")
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Asset");

                    b.Navigation("Tag");
                });

            modelBuilder.Entity("Speckles.Database.Tables.BasketAsset", b =>
                {
                    b.HasOne("Speckles.Database.Tables.Asset", "Asset")
                        .WithMany()
                        .HasForeignKey("AssetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Speckles.Database.Tables.User", "User")
                        .WithMany("BasketAssets")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Asset");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Comment", b =>
                {
                    b.HasOne("Speckles.Database.Tables.Asset", null)
                        .WithMany("Comments")
                        .HasForeignKey("AssetId");

                    b.HasOne("Speckles.Database.Tables.User", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Author");
                });

            modelBuilder.Entity("Speckles.Database.Tables.CustomLicense", b =>
                {
                    b.HasOne("Speckles.Database.Tables.Asset", "Asset")
                        .WithOne("CustomLicense")
                        .HasForeignKey("Speckles.Database.Tables.CustomLicense", "AssetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Asset");
                });

            modelBuilder.Entity("Speckles.Database.Tables.File", b =>
                {
                    b.HasOne("Speckles.Database.Tables.Asset", "Asset")
                        .WithMany("Files")
                        .HasForeignKey("AssetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Asset");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Image", b =>
                {
                    b.HasOne("Speckles.Database.Tables.Asset", "Asset")
                        .WithMany("Images")
                        .HasForeignKey("AssetId");

                    b.HasOne("Speckles.Database.Tables.Project", "Project")
                        .WithMany("Images")
                        .HasForeignKey("ProjectId");

                    b.Navigation("Asset");

                    b.Navigation("Project");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Order", b =>
                {
                    b.HasOne("Speckles.Database.Tables.Asset", "Asset")
                        .WithMany()
                        .HasForeignKey("AssetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Speckles.Database.Tables.User", "User")
                        .WithMany("Purchases")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Asset");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Project", b =>
                {
                    b.HasOne("Speckles.Database.Tables.Portfolio", null)
                        .WithMany("Projects")
                        .HasForeignKey("PortfolioId");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Recommendation", b =>
                {
                    b.HasOne("Speckles.Database.Tables.Tag", "Tag")
                        .WithMany()
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Speckles.Database.Tables.User", null)
                        .WithMany("Recommendations")
                        .HasForeignKey("UserId");

                    b.Navigation("Tag");
                });

            modelBuilder.Entity("Speckles.Database.Tables.SavedAsset", b =>
                {
                    b.HasOne("Speckles.Database.Tables.Asset", "Asset")
                        .WithMany()
                        .HasForeignKey("AssetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Speckles.Database.Tables.User", "User")
                        .WithMany("SavedAssets")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Asset");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Studio", b =>
                {
                    b.HasOne("Speckles.Database.Tables.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Speckles.Database.Tables.Portfolio", "Portfolio")
                        .WithMany()
                        .HasForeignKey("PortfolioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Address");

                    b.Navigation("Portfolio");
                });

            modelBuilder.Entity("Speckles.Database.Tables.StudioUser", b =>
                {
                    b.HasOne("Speckles.Database.Tables.Studio", "Studio")
                        .WithMany("Members")
                        .HasForeignKey("StudioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Speckles.Database.Tables.User", "User")
                        .WithMany("Studios")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Studio");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Speckles.Database.Tables.User", b =>
                {
                    b.HasOne("Speckles.Database.Tables.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Address");
                });

            modelBuilder.Entity("Speckles.Database.Tables.UserFollow", b =>
                {
                    b.HasOne("Speckles.Database.Tables.Studio", "Studio")
                        .WithMany()
                        .HasForeignKey("StudioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Speckles.Database.Tables.User", "User")
                        .WithMany("Following")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Studio");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Speckles.Database.Tables.UserLike", b =>
                {
                    b.HasOne("Speckles.Database.Tables.Comment", "Comment")
                        .WithMany("LikedBy")
                        .HasForeignKey("CommentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Speckles.Database.Tables.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Comment");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Asset", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("CustomLicense");

                    b.Navigation("Files");

                    b.Navigation("Images");

                    b.Navigation("Tags");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Comment", b =>
                {
                    b.Navigation("LikedBy");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Portfolio", b =>
                {
                    b.Navigation("Projects");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Project", b =>
                {
                    b.Navigation("Images");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Studio", b =>
                {
                    b.Navigation("Assets");

                    b.Navigation("Members");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Tag", b =>
                {
                    b.Navigation("Assets");
                });

            modelBuilder.Entity("Speckles.Database.Tables.User", b =>
                {
                    b.Navigation("BasketAssets");

                    b.Navigation("Following");

                    b.Navigation("Purchases");

                    b.Navigation("Recommendations");

                    b.Navigation("SavedAssets");

                    b.Navigation("Studios");
                });
#pragma warning restore 612, 618
        }
    }
}
