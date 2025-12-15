
namespace ITC2Wedstrijd.Models
{
    public class SpelerPloeg
    {
        public int Id { get; set; }
        public int SpelerId { get; set; } 
        public Speler Speler { get; set;}
        public int PloegId { get; set; }
        public Ploeg Ploeg { get; set; }

    }
}
