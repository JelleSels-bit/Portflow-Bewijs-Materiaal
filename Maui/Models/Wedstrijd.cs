
namespace ITC2Wedstrijd.Models
{
    public class Wedstrijd
    {
        public int Id { get; set; }
        public int PloegId1 { get; set; }
        public int PloegId2 { get; set; }
        public Ploeg Ploeg1 { get; set;}
        public Ploeg Ploeg2 { get; set;}

        [DataType(DataType.Date)]
        public DateTime Datum { get; set; }
        public int UitslagPloeg1 { get; set; }
        public int UitslagPloeg2 { get; set; }
    }
}
