using RealEstate.Api.Entity;

namespace RealEstate.Api.DTO.RealEstateDto
{
    public class newRealEstateDto : BaseDto.BaseDto
    {
        public int CurrencyId { get; set; }
        public int StatusId { get; set; }
        public int TypeId { get; set; }

        public int Price { get; set; }
        public int Size { get; set; }
        public string Title { get; set; }

        public newRealEstateDto() { }
        public newRealEstateDto(int statusId, int typeId, int price, int size, int currencyId, string title)
        {
            StatusId = statusId;
            TypeId = typeId;
            Price = price;
            Size = size;
            CurrencyId = currencyId;
            Title = title;
        }

        public RealEstateEntity ToRealEstate()
        {
            return new RealEstateEntity
            {
                Id = 0,
                Title = this.Title,
                Price = this.Price,
                Size = this.Size,
                StatusId = this.StatusId,
                CurrencyId = this.CurrencyId,
                TypeId = this.TypeId
            };
        }
    }
}
