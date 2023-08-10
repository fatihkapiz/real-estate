using RealEstate.App.Entity;

namespace RealEstate.Api.Entity
{
    public class RealEstateEntity : BaseEntity
    {
        public int Price { get; set; }
        public int Size { get; set; }
        public string Title { get; set; }

        public int CurrencyId { get; set; }
        public int StatusId { get; set; }
        public int TypeId { get; set; }

        public ICollection<Photo> Photos { get; set; }

        public Currency Currency { get; set; }
        public EstateStatus Status { get; set; }
        public EstateType Type { get; set; }
        /*
        public RealEstateEntity() { }
        public RealEstateEntity(EstateStatus status, EstateType type, int price, int size, Currency currency)
        {
            Status = status;
            Type = type;
            this.Price = price;
            this.Size = size;
            Currency = currency;
        }
        */
    }
}
