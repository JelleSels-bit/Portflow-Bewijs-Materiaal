namespace ITC2Wedstrijd;

public abstract class BaseRepository
{
    protected string ConnectionString { get; }

    public BaseRepository()
    {
        string computerName = Environment.MachineName;

        if (computerName == "LAPTOP-RFQLL7A5")
        {

            ConnectionString = DatabaseConnection.Connectionstring("ConnectionStringSqlServer");

        }
        else
        {
            ConnectionString = DatabaseConnection.Connectionstring("ConnectionStringDocker");
        }

    }
}
