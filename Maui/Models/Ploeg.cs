
namespace ITC2Wedstrijd.Models
{
    public class Ploeg
    {
        public int Id { get; set; }
        public string Naam { get; set; }
        public int CategorieId { get; set; }
        public Categorie Categorie { get; set; }
        public int ClubId { get; set; }
        public Club Club { get; set; }
        public int SportId { get; set; }
        public Sport Sport { get; set; }

        public int Gewonnen { get; set; }
        public int Verloren { get; set; }
        public int Gelijkspel {  get; set; }    

        public IEnumerable<Wedstrijd> wedstrijden {get; set;}
        public IEnumerable<Speler> spelers  { get; set; }
        
        public IEnumerable<Trainer> trainers  { get; set; }



    }
}
