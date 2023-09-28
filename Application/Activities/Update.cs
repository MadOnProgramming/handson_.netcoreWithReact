using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Update
    {
        public class Command : IRequest
        {
            public Activity Activity;
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public IMapper _mapper { get; }
            
            public Handler(DataContext context,IMapper mapper)
            {    
                _context = context;
                _mapper = mapper;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                Activity matchedActivity = _context.Activities.Find(request.Activity.Id);

                // matchedActivity.Title = request.Activity.Title;
                // matchedActivity.Description = request.Activity.Description;
                // matchedActivity.Category = request.Activity.Category;
                // matchedActivity.Date = request.Activity.Date;
                // matchedActivity.Venue = request.Activity.Venue;
                // matchedActivity.City = request.Activity.City;

                _mapper.Map(request.Activity,matchedActivity);

                await _context.SaveChangesAsync();
            }
        }
    }
}