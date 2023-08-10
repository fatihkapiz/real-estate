using RealEstate.Api.Entity;

namespace RealEstate.Api.DTO.ParameterDto
{
    public class CurrencySelectDto : BaseDto.BaseDto
    {
        public string Currency { get; set; }

        public CurrencySelectDto() { }
        public CurrencySelectDto(int id, string currency)
        {
            Id = id;
            Currency = currency;
        }

        public Currency ToCurrency()
        {
            return new Currency
            {
                Id = 0,
                CurrencySymbol = Currency
            };
        }
    }
}
