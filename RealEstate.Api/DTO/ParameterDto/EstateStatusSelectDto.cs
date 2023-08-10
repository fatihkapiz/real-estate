using RealEstate.Api.Entity;

namespace RealEstate.Api.DTO.ParameterDto
{
    public class EstateStatusSelectDto : BaseDto.BaseDto
    {
        public string Status { get; set; }

        public EstateStatusSelectDto() { }
        public EstateStatusSelectDto(int id, string status)
        {
            Id = id;
            Status = status;
        }

        public EstateStatus ToEstateStatus()
        {
            return new EstateStatus
            {
                Id = 0,
                Status = this.Status
            };
        }
    }
}
