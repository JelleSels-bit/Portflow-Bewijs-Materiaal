namespace Restaurant.Data.Repository
{
    public interface IBestellingRepository : IGenericRepository<Bestelling>
    {
        Task<List<Bestelling>> GetByReservatieAsync(int reservatieId, bool alleenActief);
        Task<List<Bestelling>> GetAllByReservatieAsync(int reservatieId, int ViewMode);
        Task<Bestelling?> GetAsync(int id);
        Task AddAsync(Bestelling bestelling);
        Task UpdateAantalAsync(int id, int newAantal);
        Task RemoveAsync(int id);
        Task<decimal> GetTotalAfrekenenAsync(int reservatieId);
        Task<decimal> GetTotalBestellenAsync(int reservatieId);
        Task ConfirmAsync(int reservatieId);
        Task<bool> ProductExistsAsync(int productId);
        Task<bool> BetalenAsync(int reservatieId, string betaalMethode, decimal? ontvangenBedrag = null);
    }
}
