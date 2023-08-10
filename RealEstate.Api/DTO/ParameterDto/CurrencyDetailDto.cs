using RealEstate.Api.Entity;

namespace RealEstate.Api.DTO.ParameterDto
{
    public class CurrencyDetailDto : BaseDto.BaseDto
    {
        public string Currency { get; set; }

        public CurrencyDetailDto(Currency item)
        {
            Id = item.Id;
            Currency = item.CurrencySymbol;
        }
    }
}
