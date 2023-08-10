using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstate.Api.Auth;
using RealEstate.Api.DatabaseContext;
using RealEstate.Api.DTO.ParameterDto;
using RealEstate.Api.DTO.RealEstateDto;
using RealEstate.Api.Entity;

namespace RealEstate.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TypeController : ControllerBase
    {
        private readonly RealEstateContext _realEstateContext;

        public TypeController(RealEstateContext realEstateContext)
        {
            _realEstateContext = realEstateContext;
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _realEstateContext.EstateTypes.ToListAsync();

            if (result == null)
                return NotFound();

            var statusList = new List<EstateType>();
            result.ForEach(x => statusList.Add(x));

            return Ok(statusList);
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpGet]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _realEstateContext.EstateTypes.SingleOrDefaultAsync(x => x.Id == id);

            if (result != null)
                return Ok(result);

            return NotFound();
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TypeSelectDto request)
        {
            var item = _realEstateContext.EstateTypes.Add(request.ToEstateType());
            await _realEstateContext.SaveChangesAsync();

            return Ok(new TypeDetailDto(item.Entity));
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] TypeSelectDto request)
        {
            var item = await _realEstateContext.EstateTypes.SingleOrDefaultAsync(x => x.Id == request.Id);
            if (item != null)
            {
                item.Type = request.Type;
                var result = await _realEstateContext.SaveChangesAsync();
                return Ok(new TypeDetailDto(item));
            }
            return NotFound();
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _realEstateContext.EstateTypes.SingleOrDefaultAsync(x => x.Id == id);
            if (item != null)
            {
                _realEstateContext.EstateTypes.Remove(item);
                await _realEstateContext.SaveChangesAsync();
                return NoContent();
            }
            return NotFound();
        }
    }
}
