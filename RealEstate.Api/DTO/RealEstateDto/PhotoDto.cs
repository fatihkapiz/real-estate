using RealEstate.Api.Entity;

namespace RealEstate.Api.DTO.RealEstateDto
{
    public class PhotoDto
    {
        public List<string> Photos { get; set; }
        public PhotoDto(ICollection<Photo> photos)
        {
            Photos = new List<string>();
            foreach (var photo in photos)
            {
                Photos.Add(photo.ImageData);
            }
        }
    }
}
