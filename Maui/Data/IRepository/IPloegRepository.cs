

namespace ITC2Wedstrijd.Data
{
    public interface IPloegRepository
    {
        public IEnumerable<Ploeg> PloegOphalen();


        public IEnumerable<Ploeg> OphalenStatistiekenWedstrijden(Ploeg SelectedPloeg);
        

        public IEnumerable<Ploeg> PloegenMetSpelers();

        bool ToevoegenPloeg(Ploeg ploeg);
        bool WijzigenPloeg(Ploeg ploeg);
        bool VerwijderenPloeg(int id);
    }
}