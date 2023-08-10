using RealEstate.App.Entity;

namespace RealEstate.Api.Entity
{
    public class EstateStatus : BaseEntity
    {
        public string Status { get; set; }
        public ICollection<RealEstateEntity> RealEstateEntities { get; set; }
    }
}
