﻿using RealEstate.Api.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstate.Api.DatabaseContext;
using RealEstate.Api.DTO.RealEstateDto;
using RealEstate.Api.Entity;
using System.Data;

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
                return Ok(result);

            return NotFound();
        }


        [Authorize(Roles = UserRoles.Admin)]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] newRealEstateDto request)
        {
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
