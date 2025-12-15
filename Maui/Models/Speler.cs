
namespace ITC2Wedstrijd.Models
{
    public class Speler
    {
        public int Id { get; set; }
        public string Voornaam { get; set; }
        public string Naam {  get; set; }
        public string Straat {  get; set; }
        public string Huisnummer { get; set; }
        public string Gemeente { get; set; }
        public string Postcode { get; set; }
        public string Land {  get; set; }

        [DataType(DataType.Date)]   
        public DateTime Geboortedatum { get; set; } = DateTime.Now;
        public Geslacht Geslacht { get; set; }

        public string VolledigeNaam => $"{Naam} {Voornaam}";

        public IEnumerable<Ploeg> ploegen { get; set; }
    }
}
