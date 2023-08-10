using RealEstate.Api.Entity;
using bdto = RealEstate.Api.DTO.BaseDto;

namespace RealEstate.Api.DTO.RealEstateDto
{
    public class RealEstateDetailDto : bdto.BaseDto
    {
        public int Price { get; set; }
        public int Size { get; set; }
        public string Title { get; set; }

        public int CurrencyId { get; set; }
        public int StatusId { get; set; }
        public int TypeId { get; set; }

        public ICollection<Photo> Photos { get; set; }

        public RealEstateDetailDto(RealEstateEntity item)
        {
            Id = item.Id;
            Title = item.Title;
            Price = item.Price;
            Size = item.Size;
            CurrencyId = item.CurrencyId;
            StatusId = item.StatusId;
            TypeId = item.TypeId;
            Photos = item.Photos;
        }
    }
}