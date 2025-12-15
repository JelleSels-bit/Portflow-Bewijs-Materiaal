

namespace ITC2Wedstrijd.Data
{
    public interface ICategorieRepository
    {
        public IEnumerable<Categorie> CategorieOphalen();

        bool ToevoegenCategorie(Categorie categorie);
        bool WijzigenCategorie(Categorie categorie);
        bool VerwijderenCategorie(int id);
    }
}