namespace ITC2Wedstrijd.Data;

public interface ITrainerRepository
{
    public IEnumerable<Trainer> AvailableTrainers(Ploeg ploeg);
    public IEnumerable<Trainer> TrainersVanPloegOphalen(Ploeg ploeg);
    public bool PlaceTrainerIntoPloeg(Trainer trainer, Ploeg ploeg);
    public bool RemoveTrainerFromPloeg(Trainer trainer, Ploeg ploeg);
}