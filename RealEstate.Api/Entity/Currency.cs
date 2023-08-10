using RealEstate.App.Entity;

namespace RealEstate.Api.Entity
{
    public class Currency : BaseEntity
    {
        public string CurrencySymbol{ get; set; }
        public ICollection<RealEstateEntity> RealEstateEntities { get; set; }
    }
}