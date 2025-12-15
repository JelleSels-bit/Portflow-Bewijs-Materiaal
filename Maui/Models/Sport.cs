

namespace ITC2Wedstrijd.Models
{
    public class Sport
    {
        public int Id { get; set; }
        public string Naam {  get; set; }

        public override bool Equals(object obj)
        {
            return obj is Sport sport && Id == sport.Id;
        }
        public IEnumerable<Ploeg> ploegen { get; set; }
    }
}
