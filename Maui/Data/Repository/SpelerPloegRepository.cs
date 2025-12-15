
namespace ITC2Wedstrijd.Data
{
    public class SpelerPloegRepository: BaseRepository, ISpelerPloegRepository
    {
        public IEnumerable<Speler> BeschikbareSpelerOphalen(Ploeg ploeg)
        {
            string sql = @"SELECT *
                    FROM Speler
                    WHERE Year(geboortedatum) <= (year(GETDATE())-@minleeftijd)
                        AND Year(geboortedatum) >= (year(GETDATE())-@maxleeftijd)
                        AND id NOT IN (SELECT spelerid FROM SpelerPloeg SP WHERE SP.ploegid = @ploegid)
                    Order by naam, voornaam";

            var parameters = new
            {
                ploegid = ploeg.Id,
                minleeftijd = ploeg.Categorie.MinLeeftijd,
                maxleeftijd = ploeg.Categorie.MaxLeeftijd
            };

            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                var Speler = db.Query<Speler>(sql, parameters);
                return Speler;

            }
        }

        public IEnumerable<Speler> SpelerInPloegOphalen(Ploeg ploeg)
        {
            string sql = @"SELECT *
                    FROM Speler
                    WHERE Year(geboortedatum) <= (year(GETDATE())-@minleeftijd)
                        AND Year(geboortedatum) >= (year(GETDATE())-@maxleeftijd)
                        AND id IN (SELECT spelerid FROM SpelerPloeg SP WHERE SP.ploegid = @ploegid)
                    Order by naam, voornaam";

            var parameters = new
            {
                ploegid = ploeg.Id,
                minleeftijd = ploeg.Categorie.MinLeeftijd,
                maxleeftijd = ploeg.Categorie.MaxLeeftijd
            };

            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                var Speler = db.Query<Speler>(sql, parameters);
                return Speler;

            }
        }

        public bool SpelerInPloegPlaatsen(Speler speler, Ploeg ploeg)
        {
            string sql = @"INSERT INTO SpelerPloeg (spelerid, ploegid)
                  VALUES (@spelerid, @ploegid)";

            var parameters = new
            {
                spelerid = speler.Id,
                ploegid = ploeg.Id
            };

            using IDbConnection db = new SqlConnection(ConnectionString);
            var affectedRows = db.Execute(sql, parameters);

            return affectedRows == 1;
        }

        public bool SpelerUitPloegHalen(Speler speler, Ploeg ploeg)
        {
            string sql = @"DELETE FROM SpelerPloeg WHERE spelerid=@spelerid
                           AND ploegid=@ploegid";

            using IDbConnection db = new SqlConnection(ConnectionString);
            var affectedRows = db.Execute(sql, new { spelerid=speler.Id,ploegid=ploeg.Id });

            return affectedRows == 1;
        }

    }
}