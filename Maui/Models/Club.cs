
namespace ITC2Wedstrijd.Models
{
    public class Club
    {
        public int Id { get; set; }
        public string Naam { get; set; }
        public override bool Equals(object obj)
        {
            return obj is Club club && Id == club.Id;
        }

        public List<Ploeg> Ploegen { get; set; }
    }
}
