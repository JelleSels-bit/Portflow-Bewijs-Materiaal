
using System.Numerics;

namespace ITC2Wedstrijd.Models
{
    public class Categorie
    {
        public int Id { get; set; }
        public string Naam {  get; set; }
        public int MinLeeftijd { get; set; }
        public int MaxLeeftijd { get; set; }
        public CategorieType CategorieType { get; set; }

        public override string ToString()
        {
            return Naam;
        }

        public override bool Equals(object obj)
        {
            return obj is Categorie categorie && Id == categorie.Id;
        }
        public IEnumerable<Ploeg> ploegen { get; set; }
    }
}
