using RealEstate.Api.Entity;

namespace RealEstate.Api.DTO.RealEstateDto
{
    public class RealEstateWithoutIdDto
    {
        public int Price { get; set; }
        public int Size { get; set; }
        public string Title { get; set; }

        public RealEstateWithoutIdDto(RealEstateEntity item)
        {
            Title = item.Title;
            Price = item.Price;
            Size = item.Size;
        }
    }
}
