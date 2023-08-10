using RealEstate.Api.Entity;

namespace RealEstate.Api.DTO.ParameterDto
{
    public class TypeDetailDto : BaseDto.BaseDto
    {
        public string Type { get; set; }

        public TypeDetailDto(EstateType item)
        {
            Id = item.Id;
            Type = item.Type;
        }
    }
}
