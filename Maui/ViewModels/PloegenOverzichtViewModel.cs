using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITC2Wedstrijd.ViewModels
{
    public partial class PloegenOverzichtViewModel : BaseViewModel
    {
        private IClubRepository _clubRepository;

        [ObservableProperty]
        private ObservableCollection<Club> clubs;

        public PloegenOverzichtViewModel(ClubRepository clubRepository)
        {
            _clubRepository = clubRepository;
            Clubs = new ObservableCollection<Club>(_clubRepository.ClubOphalen()); 

        }





    }
}
