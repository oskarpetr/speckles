﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Speckles.Database;

#nullable disable

namespace Speckles.Database.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20241013161951_Sixth")]
    partial class Sixth
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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

                    b.Property<string>("Currency")
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
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("AssetId");

                    b.HasIndex("LicenseId");

                    b.HasIndex("StudioId");

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

                    b.Property<string>("MemberId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("BasketAssetId");

                    b.HasIndex("AssetId");

                    b.HasIndex("MemberId");

                    b.ToTable("BasketAssets");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Comment", b =>
                {
                    b.Property<string>("CommentId")
                        .HasColumnType("text");

                    b.Property<string>("AssetId")
                        .HasColumnType("text");

                    b.Property<DateTimeOffset>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("MemberId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("CommentId");

                    b.HasIndex("AssetId");

                    b.HasIndex("MemberId");

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

                    b.Property<string>("StudioId")
                        .HasColumnType("text");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ImageId");

                    b.HasIndex("AssetId");

                    b.HasIndex("ProjectId");

                    b.HasIndex("StudioId")
                        .IsUnique();

                    b.ToTable("Images");
                });

            modelBuilder.Entity("Speckles.Database.Tables.License", b =>
                {
                    b.Property<string>("LicenseId")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.HasKey("LicenseId");

                    b.ToTable("Licenses");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Member", b =>
                {
                    b.Property<string>("MemberId")
                        .HasColumnType("text");

                    b.Property<string>("AddressId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("MemberId");

                    b.HasIndex("AddressId");

                    b.ToTable("Members");
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

            modelBuilder.Entity("Speckles.Database.Tables.Purchase", b =>
                {
                    b.Property<string>("PurchaseId")
                        .HasColumnType("text");

                    b.Property<string>("AssetId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTimeOffset>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("MemberId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PaymentMethod")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("PurchaseId");

                    b.HasIndex("AssetId");

                    b.HasIndex("MemberId");

                    b.ToTable("Purchases");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Recommendation", b =>
                {
                    b.Property<string>("RecommendationId")
                        .HasColumnType("text");

                    b.Property<string>("MemberId")
                        .HasColumnType("text");

                    b.Property<float>("Rate")
                        .HasColumnType("real");

                    b.Property<string>("TagId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("RecommendationId");

                    b.HasIndex("MemberId");

                    b.HasIndex("TagId");

                    b.ToTable("Recommendations");
                });

            modelBuilder.Entity("Speckles.Database.Tables.SavedAsset", b =>
                {
                    b.Property<string>("SavedAssetId")
                        .HasColumnType("text");

                    b.Property<string>("AssetId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("MemberId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("SavedAssetId");

                    b.HasIndex("AssetId");

                    b.HasIndex("MemberId");

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

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PortfolioId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("StudioId");

                    b.HasIndex("AddressId");

                    b.HasIndex("PortfolioId");

                    b.ToTable("Studios");
                });

            modelBuilder.Entity("Speckles.Database.Tables.StudioMember", b =>
                {
                    b.Property<string>("StudioMemberId")
                        .HasColumnType("text");

                    b.Property<string>("MemberId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("StudioId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("StudioMemberId");

                    b.HasIndex("MemberId");

                    b.HasIndex("StudioId");

                    b.ToTable("StudioMembers");
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

            modelBuilder.Entity("Speckles.Database.Tables.Asset", b =>
                {
                    b.HasOne("Speckles.Database.Tables.License", "License")
                        .WithMany("Assets")
                        .HasForeignKey("LicenseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Speckles.Database.Tables.Studio", "Studio")
                        .WithMany("Assets")
                        .HasForeignKey("StudioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("License");

                    b.Navigation("Studio");
                });

            modelBuilder.Entity("Speckles.Database.Tables.AssetTag", b =>
                {
                    b.HasOne("Speckles.Database.Tables.Asset", "Asset")
                        .WithMany()
                        .HasForeignKey("AssetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Speckles.Database.Tables.Tag", "Tag")
                        .WithMany()
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

                    b.HasOne("Speckles.Database.Tables.Member", "Member")
                        .WithMany("BasketAssets")
                        .HasForeignKey("MemberId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Asset");

                    b.Navigation("Member");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Comment", b =>
                {
                    b.HasOne("Speckles.Database.Tables.Asset", null)
                        .WithMany("Comments")
                        .HasForeignKey("AssetId");

                    b.HasOne("Speckles.Database.Tables.Member", "Member")
                        .WithMany()
                        .HasForeignKey("MemberId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Member");
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

            modelBuilder.Entity("Speckles.Database.Tables.Image", b =>
                {
                    b.HasOne("Speckles.Database.Tables.Asset", "Asset")
                        .WithMany("Images")
                        .HasForeignKey("AssetId");

                    b.HasOne("Speckles.Database.Tables.Project", "Project")
                        .WithMany("Images")
                        .HasForeignKey("ProjectId");

                    b.HasOne("Speckles.Database.Tables.Studio", "Studio")
                        .WithOne("Logo")
                        .HasForeignKey("Speckles.Database.Tables.Image", "StudioId");

                    b.Navigation("Asset");

                    b.Navigation("Project");

                    b.Navigation("Studio");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Member", b =>
                {
                    b.HasOne("Speckles.Database.Tables.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Address");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Project", b =>
                {
                    b.HasOne("Speckles.Database.Tables.Portfolio", null)
                        .WithMany("Projects")
                        .HasForeignKey("PortfolioId");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Purchase", b =>
                {
                    b.HasOne("Speckles.Database.Tables.Asset", "Asset")
                        .WithMany()
                        .HasForeignKey("AssetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Speckles.Database.Tables.Member", "Member")
                        .WithMany("Purchases")
                        .HasForeignKey("MemberId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Asset");

                    b.Navigation("Member");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Recommendation", b =>
                {
                    b.HasOne("Speckles.Database.Tables.Member", null)
                        .WithMany("Recommendations")
                        .HasForeignKey("MemberId");

                    b.HasOne("Speckles.Database.Tables.Tag", "Tag")
                        .WithMany()
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Tag");
                });

            modelBuilder.Entity("Speckles.Database.Tables.SavedAsset", b =>
                {
                    b.HasOne("Speckles.Database.Tables.Asset", "Asset")
                        .WithMany()
                        .HasForeignKey("AssetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Speckles.Database.Tables.Member", "Member")
                        .WithMany("SavedAssets")
                        .HasForeignKey("MemberId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Asset");

                    b.Navigation("Member");
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

            modelBuilder.Entity("Speckles.Database.Tables.StudioMember", b =>
                {
                    b.HasOne("Speckles.Database.Tables.Member", "Member")
                        .WithMany("Studios")
                        .HasForeignKey("MemberId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Speckles.Database.Tables.Studio", "Studio")
                        .WithMany("Members")
                        .HasForeignKey("StudioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Member");

                    b.Navigation("Studio");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Asset", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("CustomLicense");

                    b.Navigation("Images");
                });

            modelBuilder.Entity("Speckles.Database.Tables.License", b =>
                {
                    b.Navigation("Assets");
                });

            modelBuilder.Entity("Speckles.Database.Tables.Member", b =>
                {
                    b.Navigation("BasketAssets");

                    b.Navigation("Purchases");

                    b.Navigation("Recommendations");

                    b.Navigation("SavedAssets");

                    b.Navigation("Studios");
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

                    b.Navigation("Logo")
                        .IsRequired();

                    b.Navigation("Members");
                });
#pragma warning restore 612, 618
        }
    }
}
