

namespace ITC2Wedstrijd.Data
{
    public interface ISportRepository
    {
        public IEnumerable<Sport> SportOphalen();

        bool ToevoegenSport(Sport sport);
        bool WijzigenSport(Sport sport);
        bool VerwijderenSport(int id);
    }
}