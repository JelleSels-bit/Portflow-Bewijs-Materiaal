

namespace ITC2Wedstrijd.Data
{
    public interface ISpelerPloegRepository
    {
        public IEnumerable<Speler> BeschikbareSpelerOphalen(Ploeg ploeg);

        public IEnumerable<Speler> SpelerInPloegOphalen(Ploeg ploeg);

        public bool SpelerInPloegPlaatsen(Speler speler, Ploeg ploeg);
        public bool SpelerUitPloegHalen(Speler speler, Ploeg ploeg);
    }
}