using RealEstate.Api.Entity;
using bdto = RealEstate.Api.DTO.BaseDto;

namespace RealEstate.Api.DTO.ParameterDto
{
    public class EstateStatusDetailDto : bdto.BaseDto
    {
        public string Status { get; set; }

        public EstateStatusDetailDto(EstateStatus item)
        {
            Id = item.Id;
            Status = item.Status;
        }
    }
}