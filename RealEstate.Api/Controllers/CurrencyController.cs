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
    public class CurrencyController : ControllerBase
    {
        private readonly RealEstateContext _realEstateContext;

        public CurrencyController(RealEstateContext realEstateContext)
        {
            _realEstateContext = realEstateContext;
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _realEstateContext.Currencies.ToListAsync();

            if (result == null)
                return NotFound();

            var currencyList = new List<Currency>();
            result.ForEach(x => currencyList.Add(x));

            return Ok(currencyList);
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpGet]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _realEstateContext.Currencies.SingleOrDefaultAsync(x => x.Id == id);

            if (result != null)
                return Ok(result);

            return NotFound();
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CurrencySelectDto request)
        {
            var item = _realEstateContext.Currencies.Add(request.ToCurrency());
            await _realEstateContext.SaveChangesAsync();
            return Ok(new CurrencyDetailDto(item.Entity));
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] CurrencySelectDto request)
        {
            var item = await _realEstateContext.Currencies.SingleOrDefaultAsync(x => x.Id == request.Id);
            if (item != null)
            {
                // might add here other options to edit
                item.CurrencySymbol = request.Currency;
                var result = await _realEstateContext.SaveChangesAsync();
                return Ok(new CurrencyDetailDto(item));
            }
            return NotFound();
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _realEstateContext.Currencies.SingleOrDefaultAsync(x => x.Id == id);
            if (item != null)
            {
                _realEstateContext.Currencies.Remove(item);
                await _realEstateContext.SaveChangesAsync();
                return Ok("Item deleted.");
            }
            return NotFound();
        }
    }
}
