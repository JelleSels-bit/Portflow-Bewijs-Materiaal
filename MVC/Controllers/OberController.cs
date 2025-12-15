public class OberController : Controller
{
    private readonly RestaurantContext _context;

    public OberController(RestaurantContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Index()
    {
        var bestellingen = _context.Bestellingen
            .Include(b => b.Product)
                .ThenInclude(p => p.Categorie)
                    .ThenInclude(c => c.Type)
            .Include(b => b.Status)
            .OrderBy(b => b.TijdstipBestelling)
            .ToList();

        var reservaties = bestellingen
            .GroupBy(b => b.ReservatieId)
            .Select(g => new BestellingOverzichtViewModel
            {
                ReservatieId = g.Key,

                Gerechten = g
                    .Where(b => b.Product.Categorie.Type.Naam != "Dranken"
                                && b.StatusId != 3)
                    .Select(b => new BestellingItemViewModel
                    {
                        BestellingId = b.Id,
                        ProductId = b.ProductId,
                        ProductNaam = b.Product.Naam,
                        ProductActief = b.Product.Actief,       // ⭐ BELANGRIJK
                        StatusId = b.StatusId,
                        LokaleStatus = b.Status.Naam,
                        Opmerking = b.Opmerking,
                        CategorieType = b.Product.Categorie.Type.Naam
                    }).ToList(),

                Dranken = g
                    .Where(b => b.Product.Categorie.Type.Naam == "Dranken"
                                && b.StatusId != 3)
                    .Select(b => new BestellingItemViewModel
                    {
                        BestellingId = b.Id,
                        ProductId = b.ProductId,
                        ProductNaam = b.Product.Naam,
                        ProductActief = b.Product.Actief,       // ⭐ BELANGRIJK
                        StatusId = b.StatusId,
                        LokaleStatus = b.Status.Naam,
                        CategorieType = "Dranken"
                    }).ToList()

            })
            .Where(r => r.Gerechten.Any() || r.Dranken.Any())
            .ToList();

        return View(reservaties);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Bewerken(List<BestellingItemViewModel> items)
    {
        foreach (var item in items)
        {
            var dbItem = _context.Bestellingen.Find(item.BestellingId);
            if (dbItem != null)
            {
                dbItem.StatusId = item.StatusId;

                // ✅ Opmerking bijwerken
                dbItem.Opmerking = item.Opmerking;
            }
        }

        _context.SaveChanges();
        return RedirectToAction("Index");
    }


    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Verwijderen(int reservatieId)
    {
        var items = _context.Bestellingen.Where(b => b.ReservatieId == reservatieId).ToList();
        _context.Bestellingen.RemoveRange(items);
        _context.SaveChanges();
        return RedirectToAction("Index");
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult VerwijderGerecht(int bestellingId)
    {
        var bestelling = _context.Bestellingen.Find(bestellingId);

        if (bestelling == null)
            return NotFound();

        _context.Bestellingen.Remove(bestelling);
        _context.SaveChanges();

        return RedirectToAction("Index");
    }
}
