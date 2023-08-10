using RealEstate.Api.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstate.Api.DatabaseContext;
using RealEstate.Api.DTO.RealEstateDto;
using RealEstate.Api.Entity;
using System.Data;
using System.Xml;

namespace RealEstate.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RealEstateController : ControllerBase
    {
        private readonly RealEstateContext _realEstateContext;

        public RealEstateController(RealEstateContext realEstateContext)
        {
            _realEstateContext = realEstateContext;
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _realEstateContext.RealEstateEntities.ToListAsync();

            if (result == null)
                return NotFound();

            var realEstateList = new List<RealEstateEntity>();
            result.ForEach(x => realEstateList.Add(x));

            return Ok(realEstateList);
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpGet]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _realEstateContext.RealEstateEntities.SingleOrDefaultAsync(x => x.Id == id);
            if (result != null)
                return Ok(new RealEstateWithoutIdDto(result));

            return NotFound();
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpGet]
        [Route("getphotos")]
        public async Task<IActionResult> GetPhotosById(int id)
        {
            var current = await _realEstateContext.RealEstateEntities.SingleOrDefaultAsync(x => x.Id == id);
            var item = _realEstateContext.Photos.Where(x => x.RealEstateEntityId == current.Id).ToList();
            if (item != null)
                return Ok(new PhotoDto(item));

            return NotFound();
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpGet]
        [Route("getcurrency")]
        public async Task<IActionResult> GetCurrencyOfEstate(int id)
        {
            var current = await _realEstateContext.RealEstateEntities.SingleOrDefaultAsync(x => x.Id == id);
            var item = _realEstateContext.Currencies.SingleOrDefault(x => x.Id == current.CurrencyId).CurrencySymbol;
            if (item != null)
                return Ok(item);

            return NotFound();
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpGet]
        [Route("getstatus")]
        public async Task<IActionResult> GetStatusofEstate(int id)
        {
            var current = await _realEstateContext.RealEstateEntities.SingleOrDefaultAsync(x => x.Id == id);
            var item = _realEstateContext.EstateStatuses.SingleOrDefault(x => x.Id == current.StatusId).Status;
            if (item != null)
                return Ok(item);

            return NotFound();
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpGet]
        [Route("gettype")]
        public async Task<IActionResult> GetTypeOfEstate(int id)
        {
            var current = await _realEstateContext.RealEstateEntities.SingleOrDefaultAsync(x => x.Id == id);
            var tip = _realEstateContext.EstateTypes.SingleOrDefault(x => x.Id == current.TypeId).Type;
            if (tip != null)
                return Ok(tip);

            return NotFound();
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] newRealEstateDto request)
        {
            // check if any images are uploaded
            /*
            if (request.Images == null || request.Images.Count == 0)
            {
                return BadRequest("At least one image is required.");
            }
            */
            var item = _realEstateContext.RealEstateEntities.Add(request.ToRealEstate());
            await _realEstateContext.SaveChangesAsync();

            return Ok(new RealEstateDetailDto(item.Entity));
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] newRealEstateDto request)
        {
            var item = await _realEstateContext.RealEstateEntities.SingleOrDefaultAsync(x => x.Id == request.Id);
            if (item != null)
            {
                item.Title = request.Title;
                item.Price = request.Price;
                item.Size = request.Size;
                var result = await _realEstateContext.SaveChangesAsync();
                return Ok(new RealEstateDetailDto(item));
            }
            return NotFound();
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _realEstateContext.RealEstateEntities.SingleOrDefaultAsync(x => x.Id == id);
            if (item != null)
            {
                _realEstateContext.Remove(item);
                await _realEstateContext.SaveChangesAsync();
                return NoContent();
            }
            return NotFound();
        }
    }
}
