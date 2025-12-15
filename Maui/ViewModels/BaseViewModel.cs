

namespace ITC2Wedstrijd.ViewModels
{
    public partial class BaseViewModel : ObservableObject
    {
        [ObservableProperty]
        private string title;

        [ObservableProperty]
        [NotifyPropertyChangedFor(nameof(IsNotBusy))]
        private bool isBusy;

        public bool IsNotBusy => !isBusy;

        [RelayCommand]
        public static async Task GoBackAsync()
        {
            await Shell.Current.GoToAsync(nameof(MainPage));
        }
        [RelayCommand]
        public static async Task GoToClubAsync()
        {
            await Shell.Current.GoToAsync(nameof(ClubPage));
        }
        [RelayCommand]
        public static async Task GoToCategorieAsync()
        {
            await Shell.Current.GoToAsync(nameof(CategoriePage));
        }
        [RelayCommand]
        public static async Task GoToSportAsync()
        {
            await Shell.Current.GoToAsync(nameof(SportPage));
        }
        [RelayCommand]
        public static async Task GoToSpelerAsync()
        {
            await Shell.Current.GoToAsync(nameof(SpelerPage));
        }
        [RelayCommand]
        public static async Task GoToPloegAsync()
        {
            await Shell.Current.GoToAsync(nameof(PloegPage));
        }
    }
}