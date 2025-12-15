namespace Restaurant.ViewModels
{
    public class BestellingOverzichtViewModel
    {
       
            public int ReservatieId { get; set; }
            public List<BestellingItemViewModel> Gerechten { get; set; } = new();
            public List<BestellingItemViewModel> Dranken { get; set; } = new();
            public bool AlleDrankenGeleverd => Dranken.Any() && Dranken.All(d => d.StatusId == 3);
        


    }
}
