

namespace ITC2Wedstrijd.ViewModels
{
    [QueryProperty(nameof(Ploeg), "Ploeg")]
    public partial class ToewijzenViewModel : BaseViewModel
    {
        [ObservableProperty]
        Ploeg ploeg;

        [ObservableProperty]
        public ObservableCollection<Speler> beschikbareSpeler;

        [ObservableProperty]
        public ObservableCollection<Speler> spelerInPloeg;

        private SpelerPloegRepository _spelerPloegRepository;
        

        public Speler ItemBeingDragged;

        public ToewijzenViewModel(SpelerPloegRepository spelerPloegRepository)
        {
            _spelerPloegRepository = spelerPloegRepository;
        }

        partial void OnPloegChanged(Ploeg value)
        {
            Title = "Speler toewijzen aan " + value.Naam;
            BeschikbareSpelerOphalen();
            SpelerInPloegOphalen();
        }

        [RelayCommand]
        private void DragStarted(Speler speler)
        {
            ItemBeingDragged = speler;
        }

        public void BeschikbareSpelerOphalen()
        {
            BeschikbareSpeler = new ObservableCollection<Speler>(_spelerPloegRepository.BeschikbareSpelerOphalen(Ploeg));
        }
        public void SpelerInPloegOphalen()
        {
            SpelerInPloeg = new ObservableCollection<Speler>(_spelerPloegRepository.SpelerInPloegOphalen(Ploeg));
        }

        [RelayCommand]
        public void SpelerInPloegPlaatsen()
        {
            var result = _spelerPloegRepository.SpelerInPloegPlaatsen(ItemBeingDragged, Ploeg);

            if (result)
            {
                BeschikbareSpelerOphalen();
                SpelerInPloegOphalen();
            }
            else
            {
                Shell.Current.DisplayAlert("Fout", "Er is een fout opgetreden bij het toevoegen van de speler aan de ploeg", "OK");
            }
        }

        [RelayCommand]
        public async Task SpelerUitPloegHalen()
        {
            var result = _spelerPloegRepository.SpelerUitPloegHalen(ItemBeingDragged, Ploeg);

            if (result)
            {
                BeschikbareSpelerOphalen();
                SpelerInPloegOphalen();
            }
            else
            {
                Shell.Current.DisplayAlert("Fout", "Er is een fout opgetreden bij het verwijderen van de speler uit de ploeg", "OK");
            }
        }
    }
}
