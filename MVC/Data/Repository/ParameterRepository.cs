namespace Restaurant.Data.Repository
{
    public class ParameterRepository : GenericRepository<Parameter>, IParameterRepository
    {
        public ParameterRepository(RestaurantContext context) : base(context)
        {
        }
    }
}
