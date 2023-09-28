using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivityController : BaseApiController
    {
        /// <summary>
        /// To list all activities
        /// </summary>
        /// <returns></returns>

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken ct)
        {
            return await Mediator.Send(new List.Query(),ct);
        }

        /// <summary>
        /// To get single activity
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        /// <summary>
        /// Creates an activity
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Create(Activity activity)
        {
            await Mediator.Send(new Create.Command { Activity = activity });

            return Ok();
        }

        /// <summary>
        /// Update an activity
        /// </summary>
        /// <param name="id"></param>
        /// <param name="activity"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> Update(Activity activity)
        {
            await Mediator.Send(
                new Update.Command
                {
                    Activity = activity
                });
            return Ok();
        }

        /// <summary>
        /// Delete an activity
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await Mediator.Send(new Delete.Command { Id = id });
            return Ok();
        }
    }
}