
namespace ITC2Wedstrijd.Data
{
    public class SpelerRepository : BaseRepository, ISpelerRepository
    {
        public IEnumerable<Speler> SpelerOphalen()
        {
            string sql = @"SELECT * FROM Speler Order by naam, voornaam";

            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                var Speler = db.Query<Speler>(sql).ToList();
                return Speler;
            }
        }

        public bool ToevoegenSpeler(Speler speler)
        {
                string sql = @"INSERT INTO Speler (voornaam, naam, straat, huisnummer, gemeente, postcode, land, geboortedatum, geslacht)
                      VALUES (@voornaam, @naam, @straat, @huisnummer, @gemeente, @postcode, @land, @geboortedatum, @geslacht)";

                var parameters = new
                {
                    voornaam = speler.Voornaam,
                    naam = speler.Naam,
                    straat = speler.Straat,
                    huisnummer = speler.Huisnummer,
                    gemeente = speler.Gemeente,
                    postcode = speler.Postcode,
                    land = speler.Land,
                    geboortedatum = speler.Geboortedatum,
                    geslacht = speler.Geslacht
                };

                using IDbConnection db = new SqlConnection(ConnectionString);
                var affectedRows = db.Execute(sql, parameters);

               return affectedRows == 1;
            }

        public bool VerwijderenSpeler(int id)
        {
                string sql = @"DELETE FROM SpelerPloeg WHERE spelerid = @id;
                                DELETE FROM Speler WHERE id = @id";

                 using IDbConnection db = new SqlConnection(ConnectionString);
                 var affectedRows = db.Execute(sql, new { id });

                 return affectedRows >= 1;
        }

        public bool WijzigenSpeler(Speler speler)
        {
            string sql = @"UPDATE Speler
                        SET voornaam = @voornaam,
                            naam = @Naam,
                            straat = @straat,
                            huisnummer = @huisnummer,
                            gemeente = @gemeente,
                            postcode = @postcode,
                            land = @land,
                            geboortedatum = @geboortedatum,
                            geslacht = geslacht
                        WHERE id = @spelerid";

            var parameters = new
            {
                spelerid = speler.Id,
                voornaam = speler.Voornaam,
                naam = speler.Naam,
                straat = speler.Straat,
                huisnummer = speler.Huisnummer,
                gemeente = speler.Gemeente,
                postcode = speler.Postcode,
                land = speler.Land,
                geboortedatum = speler.Geboortedatum,
                geslacht = speler.Geslacht
            };

            using IDbConnection db = new SqlConnection(ConnectionString);
            var affectedRows = db.Execute(sql, parameters);

            return affectedRows == 1;

        }
    }
}