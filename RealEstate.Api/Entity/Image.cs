using RealEstate.App.Entity;

namespace RealEstate.Api.Entity
{
    public class Image : BaseEntity
    {
        public byte[] ImageData { get; set; }
        public int RealEstateEntityId { get; set; }

        public RealEstateEntity RealEstateEntity { get; set; }
    }
}
