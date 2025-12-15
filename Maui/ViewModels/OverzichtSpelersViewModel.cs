
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ITC2Wedstrijd.ViewModels
{
    public partial class OverzichtSpelersViewModel : BaseViewModel
    {
        private IPloegRepository _ploegRepository;

        [ObservableProperty]
        private ObservableCollection<Ploeg> ploegen;

        public OverzichtSpelersViewModel(PloegRepository ploegRepository)
        {
            _ploegRepository = ploegRepository;
            Ploegen = new ObservableCollection<Ploeg>(_ploegRepository.PloegenMetSpelers()); 
        }
    }
}
