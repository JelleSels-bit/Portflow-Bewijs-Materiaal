
namespace ITC2Wedstrijd.Data
{
    public class SportRepository : BaseRepository, ISportRepository
    {
        public IEnumerable<Sport> SportOphalen()
        {
            string sql = @"SELECT * FROM Sport Order By naam";

            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                var Sport = db.Query<Sport>(sql).ToList();
                return Sport;
            }
        }

        public bool ToevoegenSport(Sport sport)
        {
               string sql = @"INSERT INTO Sport (naam) VALUES ('" + sport.Naam + "')";

               using IDbConnection db = new SqlConnection(ConnectionString);
               var affectedRows = db.Execute(sql);

               return affectedRows == 1;
            }

        public bool VerwijderenSport(int id)
        {
                string sql = @"DELETE FROM Sport WHERE Id = @id";

                 using IDbConnection db = new SqlConnection(ConnectionString);
                 var affectedRows = db.Execute(sql, new { id });

                 return affectedRows == 1;
        }

        public bool WijzigenSport(Sport sport)
        {
               string sql = @"UPDATE Sport
                              SET naam = '" + sport.Naam + "' WHERE id = " + @sport.Id;

               using IDbConnection db = new SqlConnection(ConnectionString);
               var affectedRows = db.Execute(sql);

               return affectedRows == 1;

        }
    }
}