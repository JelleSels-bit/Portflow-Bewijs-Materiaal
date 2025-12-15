using System.Collections.Immutable;
using System.Diagnostics.Eventing.Reader;
using Restaurant.Models;
using Restaurant.Services;

namespace Restaurant.Controllers
{
    [Authorize]
    public class BestellingController :Controller
    {
        private readonly IUnitOfWork _context;
        private readonly IMapper _mapper;
        private IMailSender _mailSender;

        public BestellingController(IUnitOfWork context, IMapper mapper, IMailSender mailSender)
        {
            _context = context;
            _mapper = mapper;
            _mailSender = mailSender;
        }
        [AllowAnonymous]
        public async Task<IActionResult> Index(int reservatieId, int viewMode)
        {
            var reservatie = await _context.ReservatieRepository.GetByIdAsync(reservatieId);

            if (reservatie == null)
                return NotFound();

            if (reservatie.Tafellijsten == null)
                return View("Error", "Gelieve eerst in te checken");

            //var bestellingen = await _context.BestellingRepository.GetByReservatieAsync(reservatieId);

            var bestellingen = await _context.BestellingRepository.GetAllByReservatieAsync(reservatieId, viewMode);

            ViewBag.ViewMode = viewMode;

            var bestellingenList = _mapper.Map<List<BestellingViewModel>>(bestellingen);
            var bestellingenCombined = new List<BestellingViewModel>();

            foreach (var item in bestellingenList)
            {
                if (viewMode==1)
                {
                    if (item.StatusId == 5)
                    {
                        var existing = bestellingenCombined.FirstOrDefault(x => x.ProductId == item.ProductId);

                        if (existing == null)
                        {
                            bestellingenCombined.Add(item);
                        }
                        else
                        {
                            existing.Aantal += item.Aantal;
                        }
                    }
                }
                else
                {
                    var existing = bestellingenCombined.FirstOrDefault(x => x.ProductId == item.ProductId);

                    if (existing == null)
                    {
                        bestellingenCombined.Add(item);
                    }
                    else
                    {
                        existing.Aantal += item.Aantal;
                    }
                }

            }

            var model = new BestellingListViewModel
            {
                ReservatieId = reservatieId,
                Bestellingen = bestellingenCombined,
                Totaal = await _context.BestellingRepository.GetTotalBestellenAsync(reservatieId),
            };

            return View(model);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Add(BestellingCreateViewModel vm)
        {
            if (!ModelState.IsValid) return BadRequest();

            var productExists = await _context.BestellingRepository.ProductExistsAsync(vm.ProductId);
            if (!productExists)
            {
                return BadRequest("Product does not exist.");
            }
            Console.WriteLine($"Adding bestelling: ProductId={vm.ProductId}, ReservatieId={vm.ReservatieId}, Aantal={vm.Aantal}");
            //var reservatieId = vm.ReservatieId != 0 ? vm.ReservatieId : 10;
            if (vm.ReservatieId == 0)
            {
                return BadRequest("Geen reservatie geselecteerd.");
            }

            var reservatieId = vm.ReservatieId;

            var bestelling = new Bestelling
            {
                ReservatieId = reservatieId,
                ProductId = vm.ProductId,
                Aantal = vm.Aantal,
                Opmerking = vm.Opmerking,
                StatusId = 5
            };
            Console.WriteLine($"Adding bestelling: ProductId={vm.ProductId}, ReservatieId={reservatieId}, Aantal={vm.Aantal}");

            await _context.BestellingRepository.AddAsync(bestelling);

            return RedirectToAction("Index", new { reservatieId = vm.ReservatieId, viewMode = vm.ViewMode });

        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Update(BestellingEditViewModel vm)
        {
            await _context.BestellingRepository.UpdateAantalAsync(vm.Id, vm.Aantal);
            var reservatieId = (await _context.BestellingRepository.GetAsync(vm.Id)).ReservatieId;

            return RedirectToAction("Index", new { reservatieId, viewMode = vm.ViewMode });

        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Remove(BestellingRemoveViewModel vm)
        {
            var item = await _context.BestellingRepository.GetAsync(vm.Id);
            if (item == null) return NotFound();

            int reservatieId = item.ReservatieId;
            await _context.BestellingRepository.RemoveAsync(vm.Id);

            return RedirectToAction("Index", new { reservatieId, viewMode = vm.ViewMode });
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Confirm(int reservatieId, int viewMode)
        {
            var bestellingen = await _context.BestellingRepository.GetByReservatieAsync(reservatieId, alleenActief: true);

            if (bestellingen == null || !bestellingen.Any())
                return BadRequest("Geen bestellingen gevonden.");

            await _context.BestellingRepository.ConfirmAsync(reservatieId);

            return RedirectToAction("Index", new { reservatieId, viewMode });
        }

        [HttpPost]
        [Authorize(Roles = "Zaalverantwoordelijke,Eigenaar")]
        public async Task<IActionResult> Betalen(int reservatieId, string betaalMethode, decimal? ontvangenBedrag)
        {
            if (string.IsNullOrEmpty(betaalMethode))
                return BadRequest("Selecteer een betaalmethode.");

            var success = await _context.BestellingRepository.BetalenAsync(reservatieId, betaalMethode,ontvangenBedrag);
            var reservatie = await _context.ReservatieRepository.GetByIdAsync(reservatieId);

            if (!success)
            {
                TempData["PaymentError"] = betaalMethode == "Cash"
            ? "Het ontvangen bedrag is niet correct. Controleer het bedrag."
            : "Betaling mislukt. Probeer opnieuw.";
                return RedirectToAction("Afrekenen", new { reservatieId});
            }

            reservatie.Betaald = true;
            await _mailSender.SendEvalMail(4,reservatie);
            //network Fallback
            TempData["Success"] = "Betaling succesvol verwerkt! Bedankt.";
            await _context.SaveChangesAsync();
            return RedirectToAction("Afrekenen","Tafel");
        }

        //[Authorize(Roles = "Zaalverantwoordelijke,Eigenaar")]
        //public async Task<IActionResult> Afrekenen(int reservatieId)
        //{
        //    var reservatie = await _context.ReservatieRepository.GetByIdAsync(reservatieId);

        //    if (reservatie == null)
        //        return NotFound();

        //    if (reservatie.Tafellijsten == null)
        //        return View("Error", "Gelieve eerst in te checken");

        //    var bestellingen = await _context.BestellingRepository.GetByReservatieAsync(reservatieId);

        //    var bestellingenList = _mapper.Map<List<BestellingViewModel>>(bestellingen);
        //    var bestellingenCombined = new List<BestellingViewModel>();

        //    foreach (var item in bestellingenList)
        //    {
        //        if (item.StatusId != 4 && item.StatusId != 5)
        //        {
        //            var existing = bestellingenCombined.FirstOrDefault(x => x.ProductId == item.ProductId);

        //            if (existing == null)
        //            {
        //                bestellingenCombined.Add(item);
        //            }
        //            else
        //            {
        //                existing.Aantal += item.Aantal;
        //            }
        //        }

        //    }

        //    var model = new BestellingListViewModel
        //    {
        //        ReservatieId = reservatieId,
        //        Bestellingen = bestellingenCombined,
        //        Totaal = await _context.BestellingRepository.GetTotalAfrekenenAsync(reservatieId),
        //    };

        //    return View(model);
        //}
        [Authorize(Roles = "Zaalverantwoordelijke,Eigenaar")]
        public async Task<IActionResult> Afrekenen(int reservatieId)
        {
            var reservatie = await _context.ReservatieRepository.GetByIdAsync(reservatieId);

            if (reservatie == null)
                return NotFound();

            if (reservatie.Tafellijsten == null)
                return View("Error", "Gelieve eerst in te checken");

            //var bestellingen = await _context.BestellingRepository.GetByReservatieAsync(reservatieId);

            var bestellingen = await _context.BestellingRepository.GetByReservatieAsync(reservatieId, alleenActief: false);


            var bestellingenList = _mapper.Map<List<BestellingViewModel>>(bestellingen);
            var bestellingenCombined = new List<BestellingViewModel>();

            foreach (var item in bestellingenList)
            {
                // Alleen items die effectief op de rekening moeten komen
                if (item.StatusId != 4 && item.StatusId != 5 && item.StatusId!=6)
                {
                    var existing = bestellingenCombined.FirstOrDefault(x => x.ProductId == item.ProductId);

                    if (existing == null)
                    {
                        bestellingenCombined.Add(item);
                    }
                    else
                    {
                        existing.Aantal += item.Aantal;
                    }
                }
            }

            // 🔽 Recap-info samenstellen

            // Klantnaam
            string klantNaam;
            if (reservatie.CustomUser != null)
            {
                // Pas dit aan aan jouw CustomUser-properties
                var voornaam = reservatie.CustomUser.Voornaam;
                var achternaam = reservatie.CustomUser.Achternaam;

                if (!string.IsNullOrWhiteSpace(voornaam) || !string.IsNullOrWhiteSpace(achternaam))
                    klantNaam = $"{voornaam} {achternaam}".Trim();
                else
                    klantNaam = reservatie.CustomUser.UserName ?? "Onbekende klant";
            }
            else
            {
                klantNaam = "Onbekende klant";
            }

            // Tafelnummer (eerste tafel uit de lijst)
            var eersteTafellijst = reservatie.Tafellijsten.FirstOrDefault();
            string tafelNummer = eersteTafellijst?.Tafel?.TafelNummer ?? "-";

            DateTime? reservatieDatum = reservatie.Datum;

            // Optioneel: volgende reservatie op deze tafel (stap 3 maakt de methode)
            DateTime? volgendeReservatieDatum = null;
            if (eersteTafellijst != null)
            {
                var volgende = await _context.ReservatieRepository
     .GetNextReservationForTableAsync(
         eersteTafellijst.TafelId,
         reservatie.Datum!.Value
     );
                if (volgende != null)
                    volgendeReservatieDatum = volgende.Datum;
            }

            var model = new BestellingListViewModel
            {
                ReservatieId = reservatieId,
                Bestellingen = bestellingenCombined,
                Totaal = await _context.BestellingRepository.GetTotalAfrekenenAsync(reservatieId),

                // 🔽 nieuwe velden
                KlantNaam = klantNaam,
                TafelNummer = tafelNummer,
                ReservatieDatum = reservatieDatum,
                VolgendeReservatieDatum = volgendeReservatieDatum
            };

            return View(model);
        }

        [HttpPost]
        [Authorize(Roles = "Zaalverantwoordelijke,Eigenaar")]
        public async Task<IActionResult> UpdateRekening(BestellingEditViewModel vm)
        {
            await _context.BestellingRepository.UpdateAantalAsync(vm.Id, vm.Aantal);
            var reservatieId = (await _context.BestellingRepository.GetAsync(vm.Id)).ReservatieId;

            return RedirectToAction("Afrekenen", new { reservatieId });
        }

        [HttpPost]
        [Authorize(Roles = "Zaalverantwoordelijke,Eigenaar")]
        public async Task<IActionResult> RemoveRekening(int id)
        {
            var item = await _context.BestellingRepository.GetAsync(id);
            if (item == null) return NotFound();

            int reservatieId = item.ReservatieId;
            await _context.BestellingRepository.RemoveAsync(id);

            return RedirectToAction("Afrekenen", new { reservatieId });
        }

       




    }
}
