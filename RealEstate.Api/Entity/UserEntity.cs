using RealEstate.App.Entity;

namespace RealEstate.Api.Entity
{
    public class UserEntity : BaseEntity
    {
        public string Name { get; set; }
        public string Email { get; set; }

        public ICollection<RealEstateEntity> Listings { get; set; }
    }
}
