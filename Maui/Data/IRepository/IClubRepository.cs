

namespace ITC2Wedstrijd.Data
{
    public interface IClubRepository
    {
        public IEnumerable<Club> ClubOphalen();



        bool ToevoegenClub(Club club);
        bool WijzigenClub(Club club);
        bool VerwijderenClub(int id);
    }
}