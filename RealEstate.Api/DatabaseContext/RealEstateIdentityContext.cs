using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace RealEstate.Api.DatabaseContext
{
    public class RealEstateIdentityContext : IdentityDbContext<IdentityUser>
    {
        public RealEstateIdentityContext() { }

        public RealEstateIdentityContext(DbContextOptions<RealEstateIdentityContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
