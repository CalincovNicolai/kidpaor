using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config;

public class ParentConfiguration : IEntityTypeConfiguration<Parents>
{
    public void Configure(EntityTypeBuilder<Parents> builder)
    {
        builder.Property(p => p.Id).IsRequired();
        builder.Property(p => p.Address).IsRequired();
        builder.Property(p => p.Email).IsRequired();
        builder.Property(p => p.Fullname).IsRequired();
        builder.Property(p => p.Phone).IsRequired();
        builder.HasMany(p => p.Kids).WithOne(e => e.Parents)
            .HasForeignKey(p => p.KidsParentId);
    }
}