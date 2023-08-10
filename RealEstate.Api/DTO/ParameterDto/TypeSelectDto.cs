using RealEstate.Api.Entity;

namespace RealEstate.Api.DTO.ParameterDto
{
    public class TypeSelectDto : BaseDto.BaseDto
    {
        public string Type { get; set; }

        public TypeSelectDto() { }
        public TypeSelectDto(int id, string type)
        {
            Id = id;
            Type = type;
        }

        public EstateType ToEstateType()
        {
            return new EstateType
            {
                Id = 0,
                Type = this.Type
            };
        }
    }
}
