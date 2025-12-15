namespace ITC2Wedstrijd.Data;

public class TrainerRepository : BaseRepository, ITrainerRepository
{

    public IEnumerable<Trainer> AvailableTrainers(Ploeg ploeg)
    {
        string sql = @"SELECT *
                        FROM Trainer
                        WHERE id NOT IN (SELECT TrainerId FROM TrainerPloeg TP WHERE TP.ploegId = @ploegid)
                        ORDER BY Voornaam";

        var parameters = new
        {
            ploegid = ploeg.Id,
        };

        using (IDbConnection db = new SqlConnection(ConnectionString))
        {
            var Trainers = db.Query<Trainer>(sql, parameters);
            return Trainers;

        }
    }
    
    public IEnumerable<Trainer> TrainersVanPloegOphalen(Ploeg ploeg)
    {
        string sql = @"SELECT *
                        FROM Trainer
                        WHERE id IN (SELECT TrainerId FROM TrainerPloeg TP WHERE TP.ploegId = @ploegid)
                        ORDER BY Voornaam";

        var parameters = new
        {
            ploegid = ploeg.Id,
        };

        using (IDbConnection db = new SqlConnection(ConnectionString))
        {
            var Trainers = db.Query<Trainer>(sql, parameters);
            return Trainers;

        }
    }
    
    public bool PlaceTrainerIntoPloeg(Trainer trainer, Ploeg ploeg)
    {
        string sql = @"INSERT INTO TrainerPloeg (trainerId, ploegid)
                  VALUES (@trainerId, @ploegId)";

        var parameters = new
        {
            trainerId = trainer.Id,
            ploegId = ploeg.Id
        };

        using IDbConnection db = new SqlConnection(ConnectionString);
        var affectedRows = db.Execute(sql, parameters);

        return affectedRows == 1;
    }

    public bool RemoveTrainerFromPloeg(Trainer trainer, Ploeg ploeg)
    {
        string sql = @"DELETE FROM TrainerPloeg WHERE trainerId=@trainerId
                           AND ploegid=@ploegId";

        using IDbConnection db = new SqlConnection(ConnectionString);
        var affectedRows = db.Execute(sql, new { trainerId=trainer.Id,ploegId=ploeg.Id });

        return affectedRows == 1;
    }
}