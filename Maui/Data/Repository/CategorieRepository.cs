

namespace ITC2Wedstrijd.Data
{
    public class CategorieRepository : BaseRepository, ICategorieRepository
    {
        public IEnumerable<Categorie> CategorieOphalen()
        {
            string sql = @"SELECT * FROM Categorie Order By naam";

            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                var Categorie = db.Query<Categorie>(sql).ToList();
                return Categorie;
            }
        }


        public bool ToevoegenCategorie(Categorie categorie)
        {
               string sql = @"INSERT INTO Categorie (naam, minleeftijd, maxleeftijd, categorietype)
                  VALUES (@naam, @minleeftijd, @maxleeftijd, @categorietype)";

               var parameters = new
               {
                   naam = categorie.Naam,
                   minleeftijd = categorie.MinLeeftijd,
                   maxleeftijd = categorie.MaxLeeftijd,
                   categorietype = categorie.CategorieType
               };

               using IDbConnection db = new SqlConnection(ConnectionString);
               var affectedRows = db.Execute(sql, parameters);

               return affectedRows == 1;
            }

        public bool VerwijderenCategorie(int id)
        {
                string sql = @"DELETE FROM Categorie WHERE Id = @id";

                 using IDbConnection db = new SqlConnection(ConnectionString);
                 var affectedRows = db.Execute(sql, new { id });

                 return affectedRows == 1;

        }

        public bool WijzigenCategorie(Categorie categorie)
        {
               string sql = @"UPDATE Categorie
                              SET naam = @Naam,
                                  minleeftijd = @minleeftijd,
                                  maxleeftijd = @maxleeftijd,
                                  categorietype = @categorietype
                              WHERE id = @id";

               var parameters = new
               {
                   id = categorie.Id,
                   naam = categorie.Naam,
                   minleeftijd = categorie.MinLeeftijd,
                   maxleeftijd = categorie.MaxLeeftijd,
                   categorietype = categorie.CategorieType
               };

               using IDbConnection db = new SqlConnection(ConnectionString);
               var affectedRows = db.Execute(sql, parameters);

               return affectedRows == 1;

        }
    }
}