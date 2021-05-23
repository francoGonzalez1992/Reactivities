using Domain;
using FluentValidation;

namespace Application.Activities
{
    public class ActivitiesValidator : AbstractValidator<Activity>
    {
        public ActivitiesValidator()
        {
            RuleFor(x => x.title).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.City).NotEmpty();
            RuleFor(x => x.Venue).NotEmpty();
        }
    }
}