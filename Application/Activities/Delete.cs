using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id;
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

                _context.Activities.Remove(matchedActivity);

                await _context.SaveChangesAsync();
            }
        }
    }
}