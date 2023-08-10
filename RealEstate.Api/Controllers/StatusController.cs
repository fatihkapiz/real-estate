using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstate.Api.Auth;
using RealEstate.Api.DatabaseContext;
using RealEstate.Api.DTO.ParameterDto;
using RealEstate.Api.Entity;

namespace RealEstate.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StatusController : ControllerBase
    {
        private readonly RealEstateContext _realEstateContext;

        public StatusController(RealEstateContext realEstateContext)
        {
            _realEstateContext = realEstateContext;
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _realEstateContext.EstateStatuses.ToListAsync();

            if (result == null)
                return NotFound();

            var statusList = new List<EstateStatus>();
            result.ForEach(x => statusList.Add(x));

            return Ok(statusList);
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpGet]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _realEstateContext.EstateStatuses.SingleOrDefaultAsync(x => x.Id == id);

            if (result != null)
                return Ok(result);

            return NotFound();
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EstateStatusSelectDto request)
        {
            var item = _realEstateContext.EstateStatuses.Add(request.ToEstateStatus());
            await _realEstateContext.SaveChangesAsync();

            return Ok(new EstateStatusDetailDto(item.Entity));
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] EstateStatusSelectDto request)
        {
            var item = await _realEstateContext.EstateStatuses.SingleOrDefaultAsync(x => x.Id == request.Id);
            if (item != null)
            {
                item.Status = request.Status;
                var result = await _realEstateContext.SaveChangesAsync();
                return Ok(new EstateStatusDetailDto(item));
            }
            return NotFound();
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _realEstateContext.EstateStatuses.SingleOrDefaultAsync(x => x.Id == id);
            if (item != null)
            {
                _realEstateContext.EstateStatuses.Remove(item);
                await _realEstateContext.SaveChangesAsync();
                return NoContent();
            }
            return NotFound();
        }
    }
}
