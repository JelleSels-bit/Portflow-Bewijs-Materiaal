
namespace Restaurant.Data.Repository
{
    public class BestellingRepository : GenericRepository<Bestelling>, IBestellingRepository
    {
        public BestellingRepository(RestaurantContext context) : base(context)
        {
        }

        //public async Task<List<Bestelling>> GetByReservatieAsync(int reservatieId)
        //{
        //    return await _context.Bestellingen.Include(p=>p.Product).ThenInclude(p => p.PrijsProducten).Where(b=>b.ReservatieId == reservatieId).ToListAsync();
        //}

        public async Task<List<Bestelling>> GetByReservatieAsync(int reservatieId, bool alleenActief = false)
        {
            var query = _context.Bestellingen
                .Include(p => p.Product)
                    .ThenInclude(p => p.PrijsProducten)
                .Where(b => b.ReservatieId == reservatieId);

            if (alleenActief)
            {
                query = query.Where(b => (b.StatusId == 5 || b.StatusId == 6)
                                         && b.Product.PrijsProducten.Any());
            }

            return await query.ToListAsync();
        }
        public async Task<List<Bestelling>> GetAllByReservatieAsync(int reservatieId, int ViewMode)
        {
            var query = _context.Bestellingen
                .Include(p => p.Product)
                    .ThenInclude(p => p.PrijsProducten)
                .Where(b => b.ReservatieId == reservatieId);

            if ( ViewMode == 1)
            {
                query = query.Where(b => (b.StatusId == 5 || b.StatusId == 6)
                                         && b.Product.PrijsProducten.Any());
            }

            return await query.ToListAsync();
        }




        public async Task<Bestelling?> GetAsync(int id)
        {
            return await _context.Bestellingen
                .Include(b => b.Product)
                    .ThenInclude(p => p.PrijsProducten)
                .FirstOrDefaultAsync(b => b.Id == id);
        }

        //public override async Task AddAsync(Bestelling bestelling)
        //{
        //    bestelling.TijdstipBestelling = DateTime.Now;
        //    await _context.Bestellingen.AddAsync(bestelling);
        //    await _context.SaveChangesAsync();
        //}

        public override async Task AddAsync(Bestelling bestelling)
        {
            bestelling.TijdstipBestelling = DateTime.Now;
            bestelling.StatusId = 5; // Alleen nieuw item
            await _context.Bestellingen.AddAsync(bestelling);
            await _context.SaveChangesAsync();
        }

        //public async Task<decimal> GetTotalBestellenAsync(int reservatieId)
        //{
        //    var items = await GetByReservatieAsync(reservatieId);

        //    return items.Where(x=>x.StatusId == 5).Sum(b =>
        //    {
        //        var prijs = b.Product.PrijsProducten
        //            .OrderByDescending(pp => pp.DatumVanaf)
        //            .First().Prijs;

        //        return prijs * b.Aantal;
        //    });
        //}

        public async Task<decimal> GetTotalBestellenAsync(int reservatieId)
        {
            var items = await GetByReservatieAsync(reservatieId);

            return items
                .Where(x => x.StatusId == 5 && x.Product.PrijsProducten.Any())
                .Sum(b => b.Product.PrijsProducten
                            .OrderByDescending(pp => pp.DatumVanaf)
                            .First().Prijs * b.Aantal);
        }

        //public async Task<decimal> GetTotalAfrekenenAsync(int reservatieId)
        //{
        //    var items = await GetByReservatieAsync(reservatieId);

        //    return items.Where(x => x.StatusId != 5 && x.StatusId !=4).Sum(b =>
        //    {
        //        var prijs = b.Product.PrijsProducten
        //            .OrderByDescending(pp => pp.DatumVanaf)
        //            .First().Prijs;

        //        return prijs * b.Aantal;
        //    });
        //}

        public async Task<decimal> GetTotalAfrekenenAsync(int reservatieId)
        {
            var items = await GetByReservatieAsync(reservatieId);

            return items
                .Where(x => x.StatusId != 5 && x.StatusId != 4 && x.Product.PrijsProducten.Any())
                .Sum(b => b.Product.PrijsProducten
                            .OrderByDescending(pp => pp.DatumVanaf)
                            .First().Prijs * b.Aantal);
        }

        public async Task RemoveAsync(int id)
        {
            var item = await _context.Bestellingen.FindAsync(id);
            if (item == null) return;

            _context.Bestellingen.Remove(item);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAantalAsync(int id, int newAantal)
        {
            var item = await _context.Bestellingen.FindAsync(id);
            if (item == null) return;

            item.Aantal = newAantal;
            await _context.SaveChangesAsync();
        }

        //public async Task ConfirmAsync(int reservatieId)
        //{
        //    var bestellingen = await GetByReservatieAsync(reservatieId);

        //    foreach (var item in bestellingen)
        //    {
        //        item.TijdstipBestelling = DateTime.Today.Add(DateTime.Now.TimeOfDay);
        //        item.StatusId = 1;
        //    }

        //    await _context.SaveChangesAsync();
        //}

        public async Task ConfirmAsync(int reservatieId)
        {
            // Alleen bestellingen die nog "in bestelling" zijn (StatusId = 5)
            var bestellingen = await _context.Bestellingen
                .Where(b => b.ReservatieId == reservatieId && b.StatusId == 5)
                .ToListAsync();

            foreach (var item in bestellingen)
            {
                //item.TijdstipBestelling = DateTime.Now;
                
                item.TijdstipBestelling = DateTime.Today.Add(DateTime.Now.TimeOfDay);
                item.StatusId = 6;
            }

            await _context.SaveChangesAsync();
        }


        public async Task<bool> ProductExistsAsync(int productId)
        {
            return await _context.Producten.AnyAsync(p => p.Id == productId);
        }

        public async Task<bool> BetalenAsync(int reservatieId, string betaalMethode, decimal? ontvangenBedrag = null)
        {
            var bestellingen = await GetByReservatieAsync(reservatieId);
            if (bestellingen == null || !bestellingen.Any())
                return false;

            var totaal = await GetTotalAfrekenenAsync(reservatieId);

            if (betaalMethode == "Payconiq")
            {
                var success = true;
                if (!success)
                    return false;
            }
            else if (betaalMethode == "Cash")
            {
                if (!ontvangenBedrag.HasValue || ontvangenBedrag.Value < totaal)
                    return false;
            }

            return true;
        }
    }
}
