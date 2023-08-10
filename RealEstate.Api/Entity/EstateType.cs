using RealEstate.App.Entity;

namespace RealEstate.Api.Entity
{
    public class EstateType : BaseEntity
    {
        public string Type { get; set; }
        public ICollection<RealEstateEntity> RealEstateEntities { get; set; }
    }
}
