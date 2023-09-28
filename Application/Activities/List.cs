using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    //Usecase - get the list of activities
    public class List
    {
        //query operation class
        //returns list of activity(this is our domain object)
        public class Query : IRequest<List<Activity>>
        { } // empty as query doesn't have any parameter

        //handler class
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            public DataContext _context { get; }
            public Handler(DataContext context)
            {
                _context = context;
            }
            //handle method
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.ToListAsync<Activity>(cancellationToken: cancellationToken);
            }
        }
    }
}