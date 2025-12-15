public class KokController : Controller
{
    private readonly RestaurantContext _context;
    private readonly IUnitOfWork _unitOfWork;
    public KokController(RestaurantContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public IActionResult Index()
    {
        // Haal bestellingen op die relevant zijn voor de kok
        var bestellingen = _context.Bestellingen
            .Include(b => b.Product)
                .ThenInclude(p => p.Categorie)
                    .ThenInclude(c => c.Type)
            .Include(b => b.Status)
            .Where(b => b.Product.Categorie.Type.Naam != "Dranken" // alleen gerechten, geen dranken
                        && b.StatusId != 2 // niet geserveerd
                        && b.StatusId != 3) // niet klaar
            .OrderBy(b => b.TijdstipBestelling)
            .ToList();

        // Groepeer per reservatie en map naar viewmodel
        var reservaties = bestellingen
            .GroupBy(b => b.ReservatieId)
            .Select(g => new BestellingOverzichtViewModel
            {
                ReservatieId = g.Key,
                Gerechten = g.Select(b => new BestellingItemViewModel
                {
                    BestellingId = b.Id,
                    ProductId = b.ProductId,
                    ProductNaam = b.Product.Naam,
                    ProductActief = b.Product.Actief, // nu correct
                    StatusId = b.StatusId,
                    LokaleStatus = b.Status.Naam,
                    Opmerking = b.Opmerking,
                    AllergenenInfo = b.Product.AllergenenInfo,
                    CategorieType = b.Product.Categorie?.Type?.Naam
                }).ToList()
            })
            .Where(r => r.Gerechten.Any())
            .ToList();

        return View(reservaties);
    }


    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Bewerken(List<BestellingItemViewModel> gerechten)
    {
        foreach (var item in gerechten)
        {
            var dbItem = _context.Bestellingen.Find(item.BestellingId);
            if (dbItem != null) dbItem.StatusId = item.StatusId;
        }
        _context.SaveChanges();
        return RedirectToAction("Index");
    }

    //[Authorize(Roles = "Kok")]
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> ToggleProductBeschikbaarheid(int productId)
    {
        var product = await _context.Producten.FindAsync(productId);
        if (product == null)
            return NotFound("Product niet gevonden.");

        product.Actief = !product.Actief;
        await _context.SaveChangesAsync();

        return RedirectToAction("Index");
    }






}
