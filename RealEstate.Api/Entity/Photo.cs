using RealEstate.App.Entity;

namespace RealEstate.Api.Entity
{
    public class Photo : BaseEntity
    {
        public string ImageData { get; set; }

        public int RealEstateEntityId { get; set; }
        public RealEstateEntity RealEstateEntity { get; set; }
    }
}
