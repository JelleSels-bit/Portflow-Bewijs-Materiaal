

namespace ITC2Wedstrijd.ViewModels;

public partial class TrainersToewijzenViewModel : BaseViewModel
{
    [ObservableProperty] private ObservableCollection<Trainer> availableTrainers;
    [ObservableProperty] private ObservableCollection<Trainer> trainersInPloeg;
    [ObservableProperty] private ObservableCollection<Ploeg> allPloegs;
    [ObservableProperty] private Ploeg? selectedPloeg;
    [ObservableProperty] private Trainer? selectedTrainer;
    
    
    private TrainerRepository _trainerRepository;
    private PloegRepository _ploegRepository;

    public TrainersToewijzenViewModel(TrainerRepository trainerRepository, PloegRepository ploegRepository)
    {
        _trainerRepository = trainerRepository;
        _ploegRepository = ploegRepository;
        AllPloegs = new ObservableCollection<Ploeg>(_ploegRepository.PloegOphalen());
        Title = "Trainers toewijzen aan een club";
        SelectedPloeg = new Ploeg();
        SelectedTrainer = new Trainer();
    }
    
    partial void OnSelectedPloegChanged(Ploeg value)
    {
        Title = "Speler toewijzen aan " + value.Naam;
        RefreshTrainers();
    }
    

    [RelayCommand]
    private void RemoveTrainer()
    {

        if (!ValidationCheck()) return;
        if (!RemoveTrainerSQL()) return;
        RefreshTrainers();
    }

    [RelayCommand]
    private void AddTrainer()
    {
        if (!ValidationCheck()) return;
        
        if (TrainersInPloeg.Contains(SelectedTrainer)) 
        {
            Shell.Current.DisplayAlert("Fout", $"{SelectedTrainer.VolledigeNaam} is al toegewezen aan {SelectedPloeg.Naam}", "OK");
            return;
        }
        if (!AddTrainerSQL()) return;
        RefreshTrainers();

    }

    private bool ValidationCheck()
    {
        
        if (SelectedPloeg?.Naam == null)
        {
            Shell.Current.DisplayAlert("Fout", "Selecteer eerst een ploeg aub", "OK");
            return false;
        }
        
        if (SelectedTrainer?.Naam != null) return true;
        Shell.Current.DisplayAlert("Fout", "Selecteer eerst een trainer aub", "OK");
        return false;
    }
    
    private void RefreshTrainers()
    {
        GetAvailableTrainers();
        GetTrainersInPloeg();
    }

    private bool AddTrainerSQL()
    {
        var result = _trainerRepository.PlaceTrainerIntoPloeg(SelectedTrainer, SelectedPloeg);

        if (result) return true;
        Shell.Current.DisplayAlert("Fout",
            "Er is een fout opgetreden bij het toevoegen: selecteer aub een trainer die nog niet een trainer van de ploeg is.",
            "OK");
        return false;
        
        
    }

    private bool RemoveTrainerSQL()
    {
        var result = _trainerRepository.RemoveTrainerFromPloeg(SelectedTrainer,SelectedPloeg);

        if (result) return true;
        Shell.Current.DisplayAlert("Fout", $"{SelectedTrainer.VolledigeNaam} maakt geen deel uit van {SelectedPloeg.Naam}. Dus je kan deze ook niet verwijderen.", "OK");
        return false;
    }
    
   

    private void GetAvailableTrainers()
    {
        AvailableTrainers = new ObservableCollection<Trainer>(_trainerRepository.AvailableTrainers(SelectedPloeg));
    }

    private void GetTrainersInPloeg()
    {
        TrainersInPloeg = new ObservableCollection<Trainer>(_trainerRepository.TrainersVanPloegOphalen(SelectedPloeg));
    }
}