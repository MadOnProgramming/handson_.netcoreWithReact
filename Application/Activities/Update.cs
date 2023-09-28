using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Update
    {
        public class Command : IRequest
        {
            public Guid Id;
            public Activity Activity;
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                Activity matchedActivity = _context.Activities.Find(request.Id);

                matchedActivity.Title = request.Activity.Title;
                matchedActivity.Description = request.Activity.Description;
                matchedActivity.Category = request.Activity.Category;
                matchedActivity.Date = request.Activity.Date;
                matchedActivity.Venue = request.Activity.Venue;
                matchedActivity.City = request.Activity.City;

                await _context.SaveChangesAsync();
            }
        }
    }
}