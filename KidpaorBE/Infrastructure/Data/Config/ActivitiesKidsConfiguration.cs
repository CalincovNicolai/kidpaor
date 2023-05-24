using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config;

public class ActivitiesKidsConfiguration : IEntityTypeConfiguration<ActivitiesKids>
{
    public void Configure(EntityTypeBuilder<ActivitiesKids> builder)
    {
        builder.Property(p => p.Id).IsRequired();
        builder.HasOne(p => p.Activity).WithMany();
        builder.HasOne(p => p.Kid).WithMany();
    }
}