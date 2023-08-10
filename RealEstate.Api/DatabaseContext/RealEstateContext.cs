using Microsoft.EntityFrameworkCore;
using RealEstate.Api.Entity;

namespace RealEstate.Api.DatabaseContext
{
    public class RealEstateContext : DbContext
    {
        public DbSet<Currency> Currencies { get; set; }
        public DbSet<EstateType> EstateTypes { get; set; }
        public DbSet<EstateStatus> EstateStatuses { get; set; }
        public DbSet<RealEstateEntity> RealEstateEntities { get; set; }
        public DbSet<Photo> Photos { get; set; }

        public RealEstateContext(DbContextOptions<RealEstateContext> opt) : base(opt)
        {

        }
    }
}
