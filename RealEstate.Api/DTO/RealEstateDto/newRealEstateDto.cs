using RealEstate.Api.Entity;
using System.Buffers.Text;

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

        public ICollection<string> Photos { get; set; } // List of base64-encoded image strings

        public newRealEstateDto() { }
        public newRealEstateDto(int statusId, int typeId, int price, int size, int currencyId, string title, List<string> photos)
        {
            StatusId = statusId;
            TypeId = typeId;
            Price = price;
            Size = size;
            CurrencyId = currencyId;
            Title = title;
            Photos = photos;
        }

        public ICollection<Photo> stringToImg(ICollection<string> imgs)
        {
            List<Photo> imageList = new List<Photo>();
            foreach (var image in imgs)
            {
                imageList.Add(new Photo
                {
                    Id = 0,
                    RealEstateEntityId = this.Id,
                    ImageData = image
                }
                );
            }
            return imageList;
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
                TypeId = this.TypeId,
                Photos = stringToImg(this.Photos)
            };
        }
    }
}
