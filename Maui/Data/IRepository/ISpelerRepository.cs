

namespace ITC2Wedstrijd.Data
{
    public interface ISpelerRepository
    {
        public IEnumerable<Speler> SpelerOphalen();

        
        bool ToevoegenSpeler(Speler sport);
        bool WijzigenSpeler(Speler sport);
        bool VerwijderenSpeler(int id);
    }
}