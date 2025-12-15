

namespace ITC2Wedstrijd.Data
{
    public class ClubRepository : BaseRepository, IClubRepository
    {
        public IEnumerable<Club> ClubOphalen()
        {
            var sql = @"SELECT C.*, '' AS SplitCol, P.* 
                        FROM Club C
                        JOIN Ploeg P ON P.clubid = C.id
                        ORDER BY C.naam";

            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
               var clubs = db.Query<Club, Ploeg, Club>(
                    sql,
                    (club, ploeg) =>
                    {
                        club.Ploegen = [ploeg];
                        return club;
                    },
                    splitOn: "SplitCol"
                );

                return GroepeerClubs(clubs);
            }
        }

        private static IEnumerable<Club> GroepeerClubs(IEnumerable<Club> clubs)
        {
            var gegroepeerd = clubs.GroupBy(club => club.Id);
            List<Club> clubsMetPloegen = new List<Club>();

            foreach (var groep in gegroepeerd)
            {
                var club = groep.First();
                List<Ploeg> allePloegen = new List<Ploeg>();

                foreach (var c in groep)
                {
                    allePloegen.Add(c.Ploegen.First());
                }

                club.Ploegen = allePloegen;
                clubsMetPloegen.Add(club);
            }

            return clubsMetPloegen;
        }


        public bool ToevoegenClub(Club club)
        {
               string sql = @"INSERT INTO Club (naam) VALUES ('" + club.Naam + "')";

               using IDbConnection db = new SqlConnection(ConnectionString);
               var affectedRows = db.Execute(sql);

               return affectedRows == 1;
            }

        public bool VerwijderenClub(int id)
        {
                string sql = @"DELETE FROM Club WHERE id = @id";

                 using IDbConnection db = new SqlConnection(ConnectionString);
                 var affectedRows = db.Execute(sql, new { id });

                 return affectedRows == 1;
        }

        public bool WijzigenClub(Club club)
        {
               string sql = @"UPDATE Club
                              SET naam = '" + club.Naam + "' WHERE id = " + @club.Id;

               using IDbConnection db = new SqlConnection(ConnectionString);
               var affectedRows = db.Execute(sql);

               return affectedRows == 1;

        }
    }
}