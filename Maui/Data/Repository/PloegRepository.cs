
namespace ITC2Wedstrijd.Data
{
    public class PloegRepository : BaseRepository, IPloegRepository
    {
        public IEnumerable<Ploeg> PloegOphalen()
        {
            // De juiste volgorde is belangrijk!!
            // Eerst categorie, dan club en dan sport
            string sql = @"SELECT P.*, C.*, CL.*, S.* 
                            FROM Ploeg P
                            INNER JOIN Categorie C ON P.categorieid = C.id
                            INNER JOIN Club CL ON P.clubid = CL.id
                            INNER JOIN Sport S ON P.sportid = S.id
                            Order by P.naam";

            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                var debugVar = db.Query<Ploeg, Categorie, Club, Sport, Ploeg>(
                sql,
                // Eerst categorie, dan club en dan sport
                (Ploeg, Categorie, Club, Sport) =>
                {
                    Ploeg.Categorie = Categorie;
                    Ploeg.Club = Club;
                    Ploeg.Sport = Sport;
                    return Ploeg;
               // Eerst categorieid, dan clubid en dan sportid
                }, splitOn: "id");
                // De debugVar is enkel toegevoegd om een breakpunt te kunnen zetten
                // en de inhoud van de variabele te kunnen bekijken.
                return debugVar;

            }
        }


        public IEnumerable<Ploeg> OphalenStatistiekenWedstrijden(Ploeg SelectedPloeg)
        {
            var sql = @"SELECT P.naam,
                          
                            (SELECT COUNT(*)
                                from Wedstrijd
                                WHERE (uitslagploeg1 > uitslagploeg2 AND Ploeg1Id = P.id) OR (uitslagploeg2 > uitslagploeg1 AND Ploeg2Id = P.id)
                            )  AS ""Gewonnen"",

                            (
                                SELECT COUNT(*)
                                from Wedstrijd
                                WHERE (uitslagploeg1 < uitslagploeg2 AND ploeg1id = P.id) OR (uitslagploeg2 < uitslagploeg1 AND ploeg2id = P.id)
                            ) AS ""Verloren"",

                            (
                                SELECT COUNT(*)
                                from Wedstrijd
                                WHERE (uitslagploeg1 = uitslagploeg2 AND ploeg1id = P.id) OR  (uitslagploeg2 = uitslagploeg1 AND ploeg2id = P.id)                  
                               ) AS ""Gelijkspel""
                            FROM Ploeg P
                            WHERE P.naam LIKE '%'+ @ploegZoekterm +'%'
                            ";

            var parameters = new { @ploegZoekterm = SelectedPloeg.Naam};

            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                var ploegen = db.Query<Ploeg>(sql, parameters);
                return ploegen;
            }
        }


        public IEnumerable<Ploeg> PloegenMetSpelers()
        {
            var sql = @"SELECT P.*, '' AS SplitCol, S.*
                FROM Ploeg P
                JOIN SpelerPloeg SP ON SP.ploegId = P.Id
                JOIN Speler S ON S.Id = SP.spelerId
                order by P.naam,S.naam ";

            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                var ploegen = db.Query<Ploeg, Speler, Ploeg>(
                    sql,
                    (ploeg, speler) =>
                    {
                        ploeg.spelers = [speler];
                        return ploeg;
                    },
                    splitOn: "SplitCol"
                );

                return GroepeerPloegen(ploegen);
            }

        }

        private static IEnumerable<Ploeg> GroepeerPloegen(IEnumerable<Ploeg> ploegen)
        {
            var gegroepeerd = ploegen.GroupBy(p => p.Id);
            List<Ploeg> ploegenMetSpelers = new List<Ploeg>();

            foreach (var groep in gegroepeerd)
            {
                var ploeg = groep.First();
                List<Speler> alleSpelers = new List<Speler>();

                foreach (var item in groep)
                {
               
                    alleSpelers.Add(item.spelers.First());
                }

                ploeg.spelers = alleSpelers;
                ploegenMetSpelers.Add(ploeg);
            }

            return ploegenMetSpelers;
        }




        public bool ToevoegenPloeg(Ploeg ploeg)
        {
               string sql = @"INSERT INTO Ploeg (naam, categorieid, clubid, sportid)
                  VALUES (@naam, @categorieid, @clubid, @sportid)";

               var parameters = new
               {
                   naam = ploeg.Naam,
                   categorieid = ploeg.Categorie.Id,
                   clubid = ploeg.Club.Id,
                   sportid = ploeg.Sport.Id
               };

               using IDbConnection db = new SqlConnection(ConnectionString);
               var affectedRows = db.Execute(sql, parameters);

               return affectedRows == 1;
            }

        public bool VerwijderenPloeg(int id)
        {
                string sql = @"DELETE FROM SpelerPloeg WHERE ploegid = @id;
                                DELETE FROM Ploeg WHERE id = @id";

                 using IDbConnection db = new SqlConnection(ConnectionString);
                 var affectedRows = db.Execute(sql, new { id });

                 return affectedRows >= 1;

        }

        public bool WijzigenPloeg(Ploeg ploeg)
        {
               string sql = @"UPDATE Ploeg
                              SET naam = @naam,
                                  categorieid = @categorieid,
                                  clubid = @clubid,
                                  sportid = @sportid
                              WHERE id = @id";

               var parameters = new
               {
                   id = ploeg.Id,
                   naam = ploeg.Naam,
                   categorieid = ploeg.CategorieId,
                   clubid = ploeg.ClubId,
                   sportid = ploeg.SportId
               };

               using IDbConnection db = new SqlConnection(ConnectionString);
               var affectedRows = db.Execute(sql, parameters);

               return affectedRows == 1;

        }

    }
}