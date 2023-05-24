using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config;

public class ActivityConfiguration : IEntityTypeConfiguration<Activity>
{
    public void Configure(EntityTypeBuilder<Activity> builder)
    {
        builder.Property(p => p.Id).IsRequired();
        builder.Property(p => p.Title).IsRequired().HasMaxLength(100);
        builder.Property(p => p.Description).IsRequired();
        builder.Property(p => p.AgeRange).IsRequired();
        builder.Property(p => p.Location).IsRequired();
        builder.Property(p => p.Cost).IsRequired();
        builder.Property(p => p.DateStart).IsRequired();
        builder.Property(p => p.DateEnd).IsRequired();
        builder.HasOne(b => b.Category).WithMany()
            .HasForeignKey(p => p.ActivitiesCategoryId);
        builder.HasOne(t => t.Organizer).WithMany()
            .HasForeignKey(p => p.ActivitiesOrganizerId);
    }
}