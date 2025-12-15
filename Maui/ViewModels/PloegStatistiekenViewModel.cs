using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITC2Wedstrijd.ViewModels
{
    public partial class PloegStatistiekenViewModel : BaseViewModel
    {
        private IPloegRepository _ploegRepository;

        [ObservableProperty]
        private ObservableCollection<Ploeg> ploegenToDisplay;
        [ObservableProperty] private Ploeg selectedPloeg;
        [ObservableProperty] private ObservableCollection<Ploeg> allPloegen;
        

        public PloegStatistiekenViewModel(PloegRepository ploegRepository)
        {
            _ploegRepository = ploegRepository;
            SelectedPloeg = new Ploeg();
            AllPloegen = new ObservableCollection<Ploeg>(_ploegRepository.PloegOphalen());
            Title = "";

        }
        
        

        partial void OnSelectedPloegChanged(Ploeg value)
        {
            if (value.Naam == null)
            {
                PloegenToDisplay = null;
                return;
            }
            PloegenToDisplayOpzoeken();
        }
        

        [RelayCommand]
        private void PloegenToDisplayOpzoeken()
        {
            PloegenToDisplay = new ObservableCollection<Ploeg>(_ploegRepository.OphalenStatistiekenWedstrijden(SelectedPloeg));
        
        }
    }
}
